import React, { useContext, useEffect, useState } from 'react';
import CertificateTemplate from '@/components/CertificateTemplate';
import { AuthContext } from '@/context/auth-context';
import { useParams } from 'react-router-dom';
import { fetchStudentViewCourseDetailsService } from '@/services';
import { fetchCertificate } from '@/services/certificateService';

const CertificatePage = () => {
  const { auth } = useContext(AuthContext);
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ensure we have valid IDs
        if (!courseId || !auth?.user?._id) {
          throw new Error('Missing courseId or userId');
        }

        // Ensure courseId is a valid MongoDB ObjectId format
        const cleanCourseId = courseId.toString().match(/^[0-9a-fA-F]{24}$/) 
          ? courseId.toString()
          : null;

        if (!cleanCourseId) {
          throw new Error('Invalid course ID format');
        }

        // Fetch both course details and certificate info
        const [courseRes, certRes] = await Promise.all([
          fetchStudentViewCourseDetailsService(cleanCourseId),
          fetchCertificate(cleanCourseId, auth.user._id)
        ]);
        
        if (courseRes?.success) {
          // Combine course and certificate data
          const combinedData = {
            ...courseRes.data,
            certificate: certRes?.success ? certRes.data?.certificate : null
          };
          setCourseDetails(combinedData);
        } else {
          throw new Error('Failed to fetch course details');
        }
      } catch (err) {
        console.error('Error fetching details:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load certificate');
      } finally {
        setLoading(false);
      }
    };

    if (courseId && auth?.user?._id) {
      fetchDetails();
    }
  }, [courseId, auth?.user?._id]);
  if (!auth?.user) {
    return <div className="flex items-center justify-center min-h-screen">Please log in to view your certificate.</div>;
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading your certificate...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!courseDetails) {
    return <div className="flex items-center justify-center min-h-screen">Course details not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <CertificateTemplate
        userName={auth.user.fullName || auth.user.userName}
        userId={auth.user._id}
        courseId={courseId.toString()}
        courseName={courseDetails?.title}
        courseDescription={courseDetails?.description}
        instructorId={courseDetails?.instructorId}
        instructorName={courseDetails?.instructorName}
        existingCertificate={courseDetails?.certificate}
      />
    </div>
  );
};

export default CertificatePage;
