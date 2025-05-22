import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);

  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
}

export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get(`/instructor/course/get`);

  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

  return data;
}

export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`
  );

  return data;
}

export async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData
  );

  return data;
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function fetchStudentViewCourseListService(query) {
  const { data } = await axiosInstance.get(`/student/course/get?${query}`);

  return data;
}

export async function fetchStudentViewCourseDetailsService(courseId) {
  if (!courseId) throw new Error('Course ID is required');
  
  // Ensure courseId is a string and properly encoded
  const encodedCourseId = encodeURIComponent(courseId.toString());
  
  const { data } = await axiosInstance.get(
    `/student/course/get/details/${encodedCourseId}`
  );

  return data;
}

export async function checkCoursePurchaseInfoService(courseId, studentId) {
  if (!courseId || !studentId) throw new Error('Course ID and Student ID are required');

  // Ensure IDs are strings and properly encoded
  const encodedCourseId = encodeURIComponent(courseId.toString());
  const encodedStudentId = encodeURIComponent(studentId.toString());
  
  const { data } = await axiosInstance.get(
    `/student/course/purchase-info/${encodedCourseId}/${encodedStudentId}`
  );

  return data;
}

export async function createPaymentService(formData) {
  const { data } = await axiosInstance.post(`/student/order/create`, formData);

  return data;
}

export async function fetchCourseById(courseId) {
  const { data } = await axiosInstance.get(`/student-courses/get/${courseId}`);
  return data;
}

export async function captureAndFinalizePaymentService(
  paymentId,
  payerId,
  orderId
) {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    paymentId,
    payerId,
    orderId,
  });

  return data;
}

export async function fetchStudentBoughtCoursesService(studentId) {
  const { data } = await axiosInstance.get(
    `/student/courses-bought/get/${studentId}`
  );

  return data;
}

export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`
  );

  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
    }
  );

  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/reset-progress`,
    {
      userId,
      courseId,
    }
  );

  return data;
}

export async function generateCertificate(certificateData) {
  try {
    const { data } = await axiosInstance.post('/student/certificate/generate', certificateData);
    return data;
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw error;
  }
}

export async function fetchResumeAutomationData(email) {
  const { data } = await axiosInstance.post(`/resume-automation/fetchByEmail`,{userEmail: email});
  return data;
} 

export async function generateResumeAutomationData(formData) {
  const {data} = await axiosInstance.post(`/resume-automation/generate`, formData,{ responseType: 'blob' });
  return data;
}
export async function fetchLearningPathways() {
  const { data } = await axiosInstance.get(`/instructor/course/get-progress`);
  return data;
}

export async function fetchAssessmentList(courseId) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/assessment/${courseId}`
  );

  return data;
}
export async function fetchAssessmentDetails(assessmentId) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/assessment/details/${assessmentId}`
  );

  return data;
}
export async function createAssessment(assessmentData) {  const { data } = await axiosInstance.post(
    `/instructor/assessment/create`,
    assessmentData
  );

  return data;
}
export async function updateAssessment(assessmentId, assessmentData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/assessment/${assessmentId}`,
    assessmentData
  );

  return data;
}

export async function completeAssessment(assessmentId, studentId, score) {
  const { data } = await axiosInstance.post(
    `/instructor/assessment/complete`,
    {
      assessmentId,
      studentId,
      score
    }
  );

  return data;
}