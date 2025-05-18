import React, { useContext, useEffect, useState } from 'react';
import CertificateTemplate from '../../components/CertificateTemplate';
import { AuthContext } from '../../context/auth-context';
import { useParams } from 'react-router-dom';
import { fetchStudentViewCourseDetailsService } from '@/services';
import { fetchCertificate } from '@/services/certificateService';

const CertificatePage = () => {
  const { auth } = useContext(AuthContext);
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Ensure we have valid IDs
        if (!courseId || !auth?.user?._id) {
          console.error('Missing courseId or userId');
          return;
        }

        // Fetch both course details and certificate info
        const [courseRes, certRes] = await Promise.all([
          fetchStudentViewCourseDetailsService(courseId),
          fetchCertificate(courseId, auth.user._id)
        ]);
        
        if (courseRes?.success) {
          // Combine course and certificate data
          const combinedData = {
            ...courseRes.data,
            certificate: certRes?.success ? certRes.data?.certificate : null
          };
          console.log('Course and certificate details:', combinedData);
          setCourseDetails(combinedData);
        }
      } catch (err) {
        console.error('Error fetching details:', err);
        if (err.response?.data?.message) {
          console.error('Server message:', err.response.data.message);
        }
      }
    };

    if (courseId && auth?.user?._id) {
      fetchDetails();
    }
  }, [courseId, auth?.user?._id]);

  if (!auth?.user || !courseDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div>      <CertificateTemplate
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
