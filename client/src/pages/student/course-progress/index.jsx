import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
  generateCertificate
} from "@/services";
import { getAssessment, getAssessmentByCourse, submitAssessment, checkAssessmentStatus } from "@/api/assessmentService";
import { Check, ChevronLeft, ChevronRight, Play, CheckCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [assessmentPassed, setAssessmentPassed] = useState(false);
  const [lastScore, setLastScore] = useState(null);
  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);

          try {
            // Ensure IDs and required fields are properly set
            const userId = auth?.user?._id;
            const courseId = response?.data?.courseDetails?._id;
            const userName = auth?.user?.fullName || auth?.user?.userName;
            const courseName = response?.data?.courseDetails?.title;

            if (userId && courseId && userName && courseName) {
              await generateCertificate({
                userId: userId.toString(),
                courseId: courseId.toString(),
                userName: userName,
                courseName: courseName,
                certificateUrl: ""
              });
            } else {
              console.error('Missing required data for certificate generation:', {
                userId, courseId, userName, courseName
              });
            }
          } catch (error) {
            console.error('Error during automatic certificate generation:', error);
            if (error.response?.data?.message) {
              console.error('Server message:', error.response.data.message);
            }
          }

          checkAssessmentCompletion();
          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.success) {
        fetchCurrentCourseProgress();
      }
    }
  }

  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress();
    }
  }
  const checkAssessmentCompletion = async () => {
    try {
      // First get all assessments for this course
      const courseAssessments = await getAssessmentByCourse(id);
      if (courseAssessments.data && courseAssessments.data.length > 0) {
        // Get the first assessment or handle multiple assessments as needed
        setAssessment(courseAssessments.data[0]);
      }

      // Check assessment status
      const statusData = await checkAssessmentStatus(id, auth?.user?._id);
      setAssessmentPassed(statusData.data.allPassed);
      // Use the highest score if there are multiple assessments
      const scores = statusData.data.assessments.map(a => a.score).filter(s => s !== null);
      setLastScore(scores.length > 0 ? Math.max(...scores) : null);
    } catch (error) {
      console.error('Error checking assessment:', error);
    }
  };

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleSubmitAssessment = async () => {
    try {
      const score = assessment.questions.reduce((acc, question, index) => {
        return acc + (answers[index] === question.correctAnswer ? 1 : 0);
      }, 0) / assessment.questions.length * 100;

      const response = await submitAssessment({
        assessmentId: assessment._id,
        studentId: auth?.user?._id,
        score
      });

      setAssessmentPassed(response.data.passed);
      setLastScore(score);
      setShowAssessment(false);
      if (response.data.passed) {
        setShowConfetti(true);
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  const renderAssessment = () => {
    if (!assessment?.questions?.length) return null;
    
    const currentQ = assessment.questions[currentQuestion];
    return (
      <Dialog open={showAssessment} onOpenChange={setShowAssessment}>
        <DialogContent className="w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>Course Assessment</DialogTitle>
            <DialogDescription>
              Complete this assessment to get your certificate. You need {assessment.passingScore}% to pass.
              {lastScore && <div className="mt-2">Your last score: {lastScore}%</div>}
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <div className="mb-4">
              <Label className="text-lg font-semibold">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </Label>
              <p className="mt-2">{currentQ.text}</p>
            </div>
            <div className="space-y-2">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={answers[currentQuestion] === index ? "default" : "outline"}
                  className="w-full justify-start text-left"
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(prev => prev - 1)}
              >
                Previous
              </Button>
              {currentQuestion < assessment.questions.length - 1 ? (
                <Button
                  disabled={answers[currentQuestion] === undefined}
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  disabled={answers.length !== assessment.questions.length}
                  onClick={handleSubmitAssessment}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderCompletionDialog = () => (
    <Dialog open={showCourseCompleteDialog} onOpenChange={setShowCourseCompleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Course Completed! 🎉</DialogTitle>
          <DialogDescription>
            {assessmentPassed 
              ? "Congratulations! You've completed the course and passed the assessment. You can now get your certificate!"
              : `${lastScore !== null ? `You scored ${lastScore}% in your last attempt. ` : ''}Take the assessment to get your certificate.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4">
          {assessmentPassed ? (
            <Button onClick={() => navigate(`/student/certificate-page/${id}`)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              View Certificate
            </Button>
          ) : (
            <Button onClick={handleStartAssessment}>
              <Play className="mr-2 h-4 w-4" />
              Take Assessment
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-courses")}
            className="text-black"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
          <VideoPlayer
            width="100%"
            height="500px"
            url={currentLecture?.videoUrl}
            onProgressUpdate={setCurrentLecture}
            progressData={currentLecture}
          />
          <div className="p-6 bg-[#1c1d1f]">
            <h2 className="text-2xl font-bold mb-2">{currentLecture?.title}</h2>
          </div>
        </div>
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className=" text-black rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className=" text-black rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => (
                      <div
                        className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                        key={item._id}
                      >
                        {studentCurrentCourseProgress?.progress?.find(
                          (progressItem) => progressItem.lectureId === item._id
                        )?.viewed ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Play className="h-4 w-4 " />
                        )}
                        <span>{item?.title}</span>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About this course</h2>
                  <p className="text-gray-400">
                    {studentCurrentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {renderCompletionDialog()}
      {renderAssessment()}
    </div>
  );
}

export default StudentViewCourseProgressPage;