import { useState } from 'react';
import { ChevronDown, ChevronUp, CircleUser, BookOpen, BarChart, ArrowDownUp, Users } from 'lucide-react';

export default function LearningPathwayDashboard() {
  // Mock data for students, courses, and modules
  const initialData = {
    courses: [
      {
        id: 1,
        name: "Introduction to Programming",
        modules: [
          { id: 101, name: "Variables and Data Types" },
          { id: 102, name: "Control Structures" },
          { id: 103, name: "Functions and Methods" },
          { id: 104, name: "Object-Oriented Programming" },
        ]
      },
      {
        id: 2,
        name: "Web Development Fundamentals",
        modules: [
          { id: 201, name: "HTML Basics" },
          { id: 202, name: "CSS Styling" },
          { id: 203, name: "JavaScript Essentials" },
          { id: 204, name: "Responsive Design" },
        ]
      },
      {
        id: 3,
        name: "Data Science Principles",
        modules: [
          { id: 301, name: "Statistical Analysis" },
          { id: 302, name: "Data Visualization" },
          { id: 303, name: "Machine Learning Basics" },
          { id: 304, name: "Data Ethics" },
        ]
      }
    ],
    students: [
      {
        id: 1,
        fullName: "Emma Johnson",
        enrollments: [
          {
            courseId: 1,
            progress: [
              { moduleId: 101, completion: 100 },
              { moduleId: 102, completion: 85 },
              { moduleId: 103, completion: 60 },
              { moduleId: 104, completion: 40 },
            ]
          },
          {
            courseId: 2,
            progress: [
              { moduleId: 201, completion: 90 },
              { moduleId: 202, completion: 75 },
              { moduleId: 203, completion: 30 },
              { moduleId: 204, completion: 10 },
            ]
          }
        ]
      },
      {
        id: 2,
        fullName: "Michael Chen",
        enrollments: [
          {
            courseId: 1,
            progress: [
              { moduleId: 101, completion: 100 },
              { moduleId: 102, completion: 100 },
              { moduleId: 103, completion: 95 },
              { moduleId: 104, completion: 80 },
            ]
          },
          {
            courseId: 3,
            progress: [
              { moduleId: 301, completion: 85 },
              { moduleId: 302, completion: 70 },
              { moduleId: 303, completion: 45 },
              { moduleId: 304, completion: 20 },
            ]
          }
        ]
      },
      {
        id: 3,
        fullName: "Sophia Rodriguez",
        enrollments: [
          {
            courseId: 2,
            progress: [
              { moduleId: 201, completion: 100 },
              { moduleId: 202, completion: 100 },
              { moduleId: 203, completion: 90 },
              { moduleId: 204, completion: 85 },
            ]
          },
          {
            courseId: 3,
            progress: [
              { moduleId: 301, completion: 75 },
              { moduleId: 302, completion: 60 },
              { moduleId: 303, completion: 50 },
              { moduleId: 304, completion: 30 },
            ]
          }
        ]
      },
      {
        id: 4,
        fullName: "James Wilson",
        enrollments: [
          {
            courseId: 1,
            progress: [
              { moduleId: 101, completion: 90 },
              { moduleId: 102, completion: 75 },
              { moduleId: 103, completion: 50 },
              { moduleId: 104, completion: 25 },
            ]
          }
        ]
      },
      {
        id: 5,
        fullName: "Olivia Kim",
        enrollments: [
          {
            courseId: 2,
            progress: [
              { moduleId: 201, completion: 95 },
              { moduleId: 202, completion: 85 },
              { moduleId: 203, completion: 65 },
              { moduleId: 204, completion: 40 },
            ]
          },
          {
            courseId: 3,
            progress: [
              { moduleId: 301, completion: 100 },
              { moduleId: 302, completion: 100 },
              { moduleId: 303, completion: 90 },
              { moduleId: 304, completion: 75 },
            ]
          }
        ]
      }
    ]
  };

  const [data, setData] = useState(initialData);
  const [expandedCourses, setExpandedCourses] = useState({});
  const [expandedStudents, setExpandedStudents] = useState({});
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');

  // Toggle course expansion
  const toggleCourse = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  // Toggle student expansion
  const toggleStudent = (courseId, studentId) => {
    const key = `${courseId}-${studentId}`;
    setExpandedStudents(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Calculate overall course completion for a student
  const calculateOverallCompletion = (progress) => {
    if (!progress || progress.length === 0) return 0;
    const total = progress.reduce((sum, module) => sum + module.completion, 0);
    return Math.round(total / progress.length);
  };

  // Sort students within a course
  const sortStudents = (students, courseId) => {
    if (!sortField) return students;
    
    return [...students].sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName);
      } else if (sortField === 'completion') {
        const enrollmentA = a.enrollments.find(e => e.courseId === courseId);
        const enrollmentB = b.enrollments.find(e => e.courseId === courseId);
        
        const completionA = enrollmentA ? calculateOverallCompletion(enrollmentA.progress) : 0;
        const completionB = enrollmentB ? calculateOverallCompletion(enrollmentB.progress) : 0;
        
        return sortDirection === 'asc' 
          ? completionA - completionB
          : completionB - completionA;
      }
      return 0;
    });
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter students by name
  const filteredStudents = data.students.filter(student => 
    student.fullName.toLowerCase().includes(filterText.toLowerCase())
  );

  // Get students for a specific course
  const getStudentsForCourse = (courseId) => {
    return filteredStudents.filter(student => 
      student.enrollments.some(enrollment => enrollment.courseId === courseId)
    );
  };

  // Progress bar component
  const ProgressBar = ({ percentage }) => {
    let bgColor = 'bg-red-500';
    if (percentage >= 70) bgColor = 'bg-green-500';
    else if (percentage >= 40) bgColor = 'bg-yellow-500';

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
        <div 
          className={`h-2.5 rounded-full ${bgColor}`} 
          style={{ width: `${percentage}%` }}>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Learning Pathway Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">{data.students.length} Students</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
                <span className="font-medium">{data.courses.length} Courses</span>
              </div>
            </div>
          </div>
          
          {/* Search/Filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Courses and Students */}
        {data.courses.map(course => {
          const courseStudents = getStudentsForCourse(course.id);
          const sortedStudents = sortStudents(courseStudents, course.id);
          
          if (courseStudents.length === 0) return null;
          
          return (
            <div key={course.id} className="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
              {/* Course Header */}
              <div 
                className="bg-blue-600 text-white p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleCourse(course.id)}
              >
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 mr-2" />
                  <h2 className="text-xl font-bold">{course.name}</h2>
                  <span className="ml-4 bg-blue-700 px-3 py-1 rounded-full text-sm">
                    {courseStudents.length} Student{courseStudents.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div>
                  {expandedCourses[course.id] ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </div>
              </div>

              {/* Course Content */}
              {expandedCourses[course.id] && (
                <div className="p-4">
                  {/* Student Sort Header */}
                  <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <div 
                      className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100 rounded"
                      onClick={() => handleSort('name')}
                    >
                      <span className="font-medium">Student Name</span>
                      {sortField === 'name' && (
                        <ArrowDownUp className="h-4 w-4 ml-1 text-gray-500" />
                      )}
                    </div>
                    <div 
                      className="flex items-center cursor-pointer px-4 py-2 hover:bg-gray-100 rounded"
                      onClick={() => handleSort('completion')}
                    >
                      <span className="font-medium">Overall Completion</span>
                      {sortField === 'completion' && (
                        <ArrowDownUp className="h-4 w-4 ml-1 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {/* Students List */}
                  {sortedStudents.map(student => {
                    const enrollment = student.enrollments.find(e => e.courseId === course.id);
                    if (!enrollment) return null;
                    
                    const overallCompletion = calculateOverallCompletion(enrollment.progress);
                    const isExpanded = expandedStudents[`${course.id}-${student.id}`];
                    
                    return (
                      <div key={student.id} className="mb-4 border rounded-lg overflow-hidden">
                        {/* Student Header */}
                        <div 
                          className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                          onClick={() => toggleStudent(course.id, student.id)}
                        >
                          <div className="flex items-center">
                            <CircleUser className="h-6 w-6 text-gray-500 mr-2" />
                            <span className="font-medium">{student.fullName}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-4">
                              <div className="text-sm text-gray-500 mb-1">Overall Completion</div>
                              <div className="flex items-center">
                                <ProgressBar percentage={overallCompletion} />
                                <span className="ml-2 font-medium">{overallCompletion}%</span>
                              </div>
                            </div>
                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </div>
                        </div>

                        {/* Module Progress */}
                        {isExpanded && (
                          <div className="p-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-3">Module Progress</h4>
                            <div className="space-y-4">
                              {course.modules.map(module => {
                                const moduleProgress = enrollment.progress.find(p => p.moduleId === module.id);
                                const completion = moduleProgress ? moduleProgress.completion : 0;
                                
                                return (
                                  <div key={module.id} className="flex justify-between items-center">
                                    <span className="text-sm">{module.name}</span>
                                    <div className="flex items-center w-1/3">
                                      <div className="w-full mr-2">
                                        <ProgressBar percentage={completion} />
                                      </div>
                                      <span className="text-sm font-medium w-10 text-right">{completion}%</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {data.courses.map(course => (
            <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="font-bold">{course.name}</h3>
              </div>
              <div className="space-y-3">
                {getStudentsForCourse(course.id).map(student => {
                  const enrollment = student.enrollments.find(e => e.courseId === course.id);
                  const completion = calculateOverallCompletion(enrollment.progress);
                  return (
                    <div key={student.id} className="flex justify-between items-center">
                      <span className="text-sm truncate">{student.fullName}</span>
                      <div className="flex items-center">
                        <ProgressBar percentage={completion} />
                        <span className="ml-2 text-sm font-medium w-8 text-right">{completion}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}