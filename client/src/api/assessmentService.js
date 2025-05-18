import axiosInstance from './axiosInstance';

export const checkAssessmentStatus = async (courseId, studentId) => {
  try {
    const response = await axiosInstance.get(`/instructor/assessment/course/${courseId}/status/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking assessment status:', error);
    throw error;
  }
};

export const submitAssessment = async (assessmentData) => {
  try {
    const response = await axiosInstance.post('/instructor/assessment/complete', assessmentData);
    return response.data;
  } catch (error) {
    console.error('Error submitting assessment:', error);
    throw error;
  }
};

export const getAssessmentByCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/instructor/assessment/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting course assessment:', error);
    throw error;
  }
};

export const getAssessment = async (assessmentId) => {
  try {
    const response = await axiosInstance.get(`/instructor/assessment/get/${assessmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting assessment:', error);
    throw error;
  }
};