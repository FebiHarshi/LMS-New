import React, { useContext, useEffect, useState } from 'react';
import CertificateTemplate from '../../components/CertificateTemplate';
import { AuthContext } from '../../context/auth-context';
import { useParams } from 'react-router-dom';
import { fetchStudentViewCourseDetailsService } from '@/services';

const CertificatePage = () => {
  const { auth } = useContext(AuthContext);
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await fetchStudentViewCourseDetailsService(courseId);
        if (res?.success) {
          console.log('Course details:', res.data); // Add logging
          setCourseDetails(res.data);
        }
      } catch (err) {
        console.error('Error fetching course details:', err);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (!auth?.user || !courseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CertificateTemplate
        userName={auth.user.userName}
        userId={auth.user._id}
        courseId={courseId}
        courseName={courseDetails?.title}
        courseDescription={courseDetails?.description}
        instructorId={courseDetails?.instructorId}
        instructorName={courseDetails?.instructorName}
      />
    </div>
  );
};

export default CertificatePage;
