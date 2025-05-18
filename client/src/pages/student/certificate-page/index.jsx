import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '@/context/auth-context';
import CertificateTemplate from '@/components/CertificateTemplate';
import axiosInstance from '@/api/axiosInstance';
import { Button } from "@/components/ui/button";

const CertificatePage = () => {
  const { courseId } = useParams();
  const { auth } = useContext(AuthContext);
  const [courseDetails, setCourseDetails] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axiosInstance.get(`/student/certificate/${courseId}?userId=${auth.user._id}`);
        if (response.data.success) {
          console.log('Course details:', response.data.data);
          setCourseDetails(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError('Failed to load course details. Please try again later.');
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Certificate</h1>
        <p className="text-gray-600">
          Congratulations on completing {courseDetails.title}!
        </p>
      </div>
      
      <CertificateTemplate
        userName={auth.user.fullName}
        courseName={courseDetails.title}
        userId={auth.user._id}
        courseId={courseId}
        courseDescription={courseDetails.description}
        instructorName={courseDetails.instructorName}
      />
    </div>
  );
};

export default CertificatePage;
