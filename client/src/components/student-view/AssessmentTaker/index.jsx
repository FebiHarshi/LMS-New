import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeAssessment } from '../../../services';
import { AuthContext } from '../../../context/auth-context';

export default function AssessmentTaker({ assessment, onComplete }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [answers, setAnswers] = useState(Array(assessment.questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (answer === assessment.questions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / assessment.questions.length) * 100);
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.some(answer => answer === null)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);

    try {
      const response = await completeAssessment(
        assessment._id,
        auth.user._id,
        finalScore
      );

      if (response.success) {
        if (onComplete) {
          onComplete(finalScore);
        }
      } else {
        alert('Failed to save assessment result: ' + response.message);
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment. Please try again.');
    }
  };

  const renderQuestion = (question, index) => {
    return (
      <div key={index} className="mb-8 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-medium mb-4">{`${index + 1}. ${question.text}`}</h3>
        <div className="space-y-2">
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
              <input
                type="radio"
                name={`question-${index}`}
                checked={answers[index] === optionIndex}
                onChange={() => handleAnswerChange(index, optionIndex)}
                disabled={submitted}
                className="w-4 h-4 text-blue-600"
              />
              <span className={
                submitted 
                  ? optionIndex === question.correctAnswer 
                    ? 'text-green-600 font-medium'
                    : answers[index] === optionIndex
                      ? 'text-red-600'
                      : ''
                  : ''
              }>
                {option}
              </span>
            </label>
          ))}
        </div>
        {submitted && answers[index] !== question.correctAnswer && (
          <p className="mt-2 text-red-600">
            Correct answer: {question.options[question.correctAnswer]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{assessment.title}</h2>
      
      <div className="space-y-6">
        {assessment.questions.map((question, index) => renderQuestion(question, index))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Assessment
        </button>
      ) : (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium">Assessment Complete</h3>
          <p className="text-lg mt-2">
            Your score: <span className="font-bold">{score}%</span>
          </p>
          <button
            onClick={() => navigate(`/course/${assessment.courseId}`)}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Return to Course
          </button>
        </div>
      )}
    </div>
  );
}
