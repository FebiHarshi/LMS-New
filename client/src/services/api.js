import { API_BASE_URL } from './config';

export const getAccessedCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/instructor/accessed`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch accessed courses');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Error fetching accessed courses');
  }
};