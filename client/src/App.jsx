import { Route, Routes } from "react-router-dom";
import LMSHomepage from "./pages/homepage";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import AboutUs from "./pages/aboutus";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCoursesPage from "./pages/student/course";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import CertificatePage from "./pages/student/certificate-page";
import ResumeAutomationPage from "./pages/student/resume-automation";
import LearningPathwayDashboard from "./components/instructor-view/learning-pathways";
import AssessmentForm from "./components/instructor-view/Assessmentform";
import AssessmentTaker from './components/student-view/AssessmentTaker';

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<LMSHomepage />} />
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      ></Route>
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/learning-pathways"
        element={
          <RouteGuard
            element={<LearningPathwayDashboard />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/assessment-form/:courseId"
        element={
          <RouteGuard
            element={<AssessmentForm />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="course-details/:id"
          element={<StudentViewCourseDetailsPage />}
        />
        <Route path="/payment-return" element={<PaypalPaymentReturnPage />} />
        <Route path="student-courses" element={<StudentCoursesPage />} />
        <Route
          path="course-progress/:id"
          element={<StudentViewCourseProgressPage />}
        />
        <Route
          path="course/:courseId/assessment/:assessmentId"
          element={<AssessmentTaker />}
        /> 
        <Route path="/student/certificate-page/:courseId" element={<CertificatePage />} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/resume-automation" element={<ResumeAutomationPage />} />
    </Routes>
  );
}
export default App;
