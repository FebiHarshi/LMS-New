import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

export default function AssessmentForm() {
  const [assessment, setAssessment] = useState({
    title: '',
    courseId: '',
    questions: [
      {
        text: '',
        options: ['', ''],
        correctAnswer: 0
      }
    ]
  });

  const handleTitleChange = (e) => {
    setAssessment({
      ...assessment,
      title: e.target.value
    });
  };

  const handleCourseIdChange = (e) => {
    setAssessment({
      ...assessment,
      courseId: e.target.value
    });
  };

  const handleQuestionTextChange = (index, e) => {
    const updatedQuestions = [...assessment.questions];
    updatedQuestions[index].text = e.target.value;
    setAssessment({
      ...assessment,
      questions: updatedQuestions
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...assessment.questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setAssessment({
      ...assessment,
      questions: updatedQuestions
    });
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...assessment.questions];
    updatedQuestions[questionIndex].correctAnswer = optionIndex;
    setAssessment({
      ...assessment,
      questions: updatedQuestions
    });
  };

  const addQuestion = () => {
    setAssessment({
      ...assessment,
      questions: [
        ...assessment.questions,
        {
          text: '',
          options: ['', ''],
          correctAnswer: 0
        }
      ]
    });
  };

  const removeQuestion = (index) => {
    if (assessment.questions.length > 1) {
      const updatedQuestions = [...assessment.questions];
      updatedQuestions.splice(index, 1);
      setAssessment({
        ...assessment,
        questions: updatedQuestions
      });
    }
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...assessment.questions];
    updatedQuestions[questionIndex].options.push('');
    setAssessment({
      ...assessment,
      questions: updatedQuestions
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...assessment.questions];
    if (updatedQuestions[questionIndex].options.length > 2) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      
      // Update correctAnswer if needed
      if (updatedQuestions[questionIndex].correctAnswer === optionIndex) {
        updatedQuestions[questionIndex].correctAnswer = 0;
      } else if (updatedQuestions[questionIndex].correctAnswer > optionIndex) {
        updatedQuestions[questionIndex].correctAnswer--;
      }
      
      setAssessment({
        ...assessment,
        questions: updatedQuestions
      });
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Here you would typically send the assessment data to your backend
    console.log('Assessment submitted:', assessment);
    alert('Assessment created successfully!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Assessment</h1>
      
      <div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assessment Title
          </label>
          <input
            type="text"
            value={assessment.title}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter assessment title"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course ID
          </label>
          <input
            type="text"
            value={assessment.courseId}
            onChange={handleCourseIdChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter course ID"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Questions</h2>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={16} className="mr-1" /> Add Question
            </button>
          </div>

          {assessment.questions.map((question, questionIndex) => (
            <div 
              key={questionIndex} 
              className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Question {questionIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="text-red-500 hover:text-red-700"
                  disabled={assessment.questions.length <= 1}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text
                </label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => handleQuestionTextChange(questionIndex, e)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter question text"
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Options
                  </label>
                  <button
                    type="button"
                    onClick={() => addOption(questionIndex)}
                    className="text-sm flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={14} className="mr-1" /> Add Option
                  </button>
                </div>

                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`correctAnswer-${questionIndex}`}
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                      className="flex-grow p-2 border border-gray-300 rounded-md"
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    {question.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(questionIndex, optionIndex)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <p className="mt-1 text-sm text-gray-500">
                  Select the radio button next to the correct answer
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Save size={16} className="mr-2" /> Save Assessment
          </button>
        </div>
      </div>
    </div>
  );
}