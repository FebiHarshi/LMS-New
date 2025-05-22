import axiosInstance from '@/api/axiosInstance';

export async function generateCertificate(certificateData) {
  try {
    // Validate required fields
    const { userId, courseId, userName, courseName } = certificateData;
    if (!userId || !courseId || !userName || !courseName) {
      throw new Error('Missing required fields for certificate generation');
    }

    // Ensure IDs are strings
    const payload = {
      ...certificateData,
      userId: userId.toString(),
      courseId: courseId.toString()
    };

    const { data } = await axiosInstance.post('/student/certificate/generate', payload);
    return data;
  } catch (error) {
    // Enhanced error handling
    console.error('Certificate generation error:', {
      message: error.message,
      response: error.response?.data,
      data: certificateData
    });
    throw error;
  }
}

export async function fetchCertificate(courseId, userId) {
  try {
    if (!courseId || !userId) {
      throw new Error('Course ID and User ID are required');
    }
    
    // Ensure courseId and userId are strings and properly URI-encoded
    const encodedCourseId = encodeURIComponent(courseId.toString());
    const encodedUserId = encodeURIComponent(userId.toString());
    
    const { data } = await axiosInstance.get(`/student/certificate/${encodedCourseId}?userId=${encodedUserId}`);
    return data;
  } catch (error) {
    console.error('Error fetching certificate:', error);
    throw error;
  }
}
