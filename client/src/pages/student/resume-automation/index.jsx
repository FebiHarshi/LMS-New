import React, { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { generateResumeAutomationData,fetchResumeAutomationData } from '@/services';
import { AuthContext } from "@/context/auth-context";

function App() {
  const { auth } = useContext(AuthContext);
  // State to store form data
  const [formData, setFormData] = useState({
    userName:'',
    userEmail:'',
    personalDetails: {
      fullName: '',
      contactNumber: '',
      emailAddress: '',
      location:'',
    },
    profileSummary: '',
    education: [
      {
        degree: '',
        institutionName: '',
        location: '',
        startDate: '',
        endDate: '',
        percentage: '',
      },
    ],
    skills: [],
    availableSkills: [
      // Technical Skills
      { id: 1, name: 'JavaScript', category: 'Programming Languages' },
      { id: 2, name: 'Python', category: 'Programming Languages' },
      { id: 3, name: 'Java', category: 'Programming Languages' },
      { id: 4, name: 'C++', category: 'Programming Languages' },
      { id: 5, name: 'C#', category: 'Programming Languages' },
      { id: 6, name: 'PHP', category: 'Programming Languages' },
      { id: 7, name: 'Ruby', category: 'Programming Languages' },
      { id: 8, name: 'Swift', category: 'Programming Languages' },
      { id: 9, name: 'Go', category: 'Programming Languages' },
      { id: 10, name: 'TypeScript', category: 'Programming Languages' },
      { id: 11, name: 'Kotlin', category: 'Programming Languages' },
      { id: 12, name: 'Rust', category: 'Programming Languages' },

      // Frameworks & Libraries
      { id: 13, name: 'React', category: 'Frameworks & Libraries' },
      { id: 14, name: 'Angular', category: 'Frameworks & Libraries' },
      { id: 15, name: 'Vue.js', category: 'Frameworks & Libraries' },
      { id: 16, name: 'Node.js', category: 'Frameworks & Libraries' },
      { id: 17, name: 'Express.js', category: 'Frameworks & Libraries' },
      { id: 18, name: 'Django', category: 'Frameworks & Libraries' },
      { id: 19, name: 'Flask', category: 'Frameworks & Libraries' },
      { id: 20, name: 'Spring Boot', category: 'Frameworks & Libraries' },
      { id: 21, name: 'Laravel', category: 'Frameworks & Libraries' },
      { id: 22, name: 'ASP.NET', category: 'Frameworks & Libraries' },
      { id: 23, name: 'Ruby on Rails', category: 'Frameworks & Libraries' },
      { id: 24, name: 'Flutter', category: 'Frameworks & Libraries' },

      // Databases
      { id: 25, name: 'MySQL', category: 'Databases' },
      { id: 26, name: 'PostgreSQL', category: 'Databases' },
      { id: 27, name: 'MongoDB', category: 'Databases' },
      { id: 28, name: 'SQLite', category: 'Databases' },
      { id: 29, name: 'Oracle', category: 'Databases' },
      { id: 30, name: 'SQL Server', category: 'Databases' },
      { id: 31, name: 'Redis', category: 'Databases' },
      { id: 32, name: 'Firebase', category: 'Databases' },
      { id: 33, name: 'DynamoDB', category: 'Databases' },
      { id: 34, name: 'Cassandra', category: 'Databases' },

      // Cloud & DevOps
      { id: 35, name: 'AWS', category: 'Cloud & DevOps' },
      { id: 36, name: 'Azure', category: 'Cloud & DevOps' },
      { id: 37, name: 'Google Cloud', category: 'Cloud & DevOps' },
      { id: 38, name: 'Docker', category: 'Cloud & DevOps' },
      { id: 39, name: 'Kubernetes', category: 'Cloud & DevOps' },
      { id: 40, name: 'Jenkins', category: 'Cloud & DevOps' },
      { id: 41, name: 'Git', category: 'Cloud & DevOps' },
      { id: 42, name: 'GitHub Actions', category: 'Cloud & DevOps' },
      { id: 43, name: 'Terraform', category: 'Cloud & DevOps' },
      { id: 44, name: 'Ansible', category: 'Cloud & DevOps' },

      // Tools & Other
      { id: 45, name: 'VS Code', category: 'Tools & Other' },
      { id: 46, name: 'IntelliJ IDEA', category: 'Tools & Other' },
      { id: 47, name: 'Jira', category: 'Tools & Other' },
      { id: 48, name: 'Figma', category: 'Tools & Other' },
      { id: 49, name: 'Adobe XD', category: 'Tools & Other' },
      { id: 50, name: 'Photoshop', category: 'Tools & Other' },
      { id: 51, name: 'Illustrator', category: 'Tools & Other' },
      { id: 52, name: 'Postman', category: 'Tools & Other' },
      { id: 53, name: 'Swagger', category: 'Tools & Other' },

      // Soft Skills
      { id: 54, name: 'Communication', category: 'Soft Skills' },
      { id: 55, name: 'Leadership', category: 'Soft Skills' },
      { id: 56, name: 'Teamwork', category: 'Soft Skills' },
      { id: 57, name: 'Problem Solving', category: 'Soft Skills' },
      { id: 58, name: 'Time Management', category: 'Soft Skills' },
      { id: 59, name: 'Critical Thinking', category: 'Soft Skills' },
      { id: 60, name: 'Adaptability', category: 'Soft Skills' },
      { id: 61, name: 'Creativity', category: 'Soft Skills' },
      { id: 62, name: 'Project Management', category: 'Soft Skills' },
      { id: 63, name: 'Agile Methodology', category: 'Soft Skills' },
      { id: 64, name: 'Scrum', category: 'Soft Skills' },
    ],
    customSkills: [],
    experience: [
      {
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: [''],
      },
    ],
    certifications: '',
    projects: [
      {
        title: '',
        techStack: '',
        startDate: '',
        endDate: '',
        description: '',
        contributions: '',
      },
    ],
  });

  // Handle input changes for personal details
  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalDetails: {
        ...formData.personalDetails,
        [name]: value,
      },
    });
  };

  // Handle profile summary change
  const handleProfileSummaryChange = (e) => {
    setFormData({
      ...formData,
      profileSummary: e.target.value,
    });
  };

  // Handle input changes for education
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  // Add new education field
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: '',
          institutionName: '',
          location: '',
          startDate: '',
          endDate: '',
          percentage: '',
        },
      ],
    });
  };

  // Remove education field
  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      const updatedEducation = [...formData.education];
      updatedEducation.splice(index, 1);
      setFormData({
        ...formData,
        education: updatedEducation,
      });
    }
  };

  // Handle skill selection
  const toggleSkill = (skillId) => {
    const skill = formData.availableSkills.find(s => s.id === skillId);

    if (formData.skills.some(s => s.id === skillId)) {
      // Remove the skill
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s.id !== skillId),
      });
    } else {
      // Add the skill
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };

  // Add custom skill
  const addCustomSkill = (e) => {
    e.preventDefault();
    const customSkillInput = document.getElementById('customSkill');
    const customSkillCategory = document.getElementById('customSkillCategory');

    if (customSkillInput.value.trim() === '') return;

    const newSkill = {
      id: `custom-${formData.customSkills.length + 1}`,
      name: customSkillInput.value.trim(),
      category: customSkillCategory.value || 'Other',
    };

    setFormData({
      ...formData,
      customSkills: [...formData.customSkills, newSkill],
      skills: [...formData.skills, newSkill],
    });

    customSkillInput.value = '';
  };

  // Remove custom skill
  const removeCustomSkill = (skillId) => {
    setFormData({
      ...formData,
      customSkills: formData.customSkills.filter(s => s.id !== skillId),
      skills: formData.skills.filter(s => s.id !== skillId),
    });
  };

  // Handle input changes for experience
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  // Handle responsibilities change
  const handleResponsibilityChange = (expIndex, respIndex, e) => {
    const { value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[expIndex].responsibilities[respIndex] = value;
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  // Add new responsibility field
  const addResponsibility = (expIndex) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[expIndex].responsibilities.push('');
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  // Remove responsibility field
  const removeResponsibility = (expIndex, respIndex) => {
    if (formData.experience[expIndex].responsibilities.length > 1) {
      const updatedExperience = [...formData.experience];
      updatedExperience[expIndex].responsibilities.splice(respIndex, 1);
      setFormData({
        ...formData,
        experience: updatedExperience,
      });
    }
  };

  // Add new experience field
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          jobTitle: '',
          companyName: '',
          location: '',
          startDate: '',
          endDate: '',
          responsibilities: [''],
        },
      ],
    });
  };

  // Remove experience field
  const removeExperience = (index) => {
    if (formData.experience.length > 1) {
      const updatedExperience = [...formData.experience];
      updatedExperience.splice(index, 1);
      setFormData({
        ...formData,
        experience: updatedExperience,
      });
    }
  };

  // Handle input changes for certifications
  const handleCertificationsChange = (e) => {
    setFormData({
      ...formData,
      certifications: e.target.value,
    });
  };

  // Handle input changes for projects
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  // Add new project field
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: '',
          techStack: '',
          startDate: '',
          endDate: '',
          description: '',
          contributions: '',
        },
      ],
    });
  };

  // Remove project field
  const removeProject = (index) => {
    if (formData.projects.length > 1) {
      const updatedProjects = [...formData.projects];
      updatedProjects.splice(index, 1);
      setFormData({
        ...formData,
        projects: updatedProjects,
      });
    }
  };

  // Group skills by category
  const getGroupedSkills = () => {
    const categories = {};
    formData.availableSkills.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push(skill);
    });
    return categories;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Resume Data:', formData);
    printResume();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  useEffect(() => {
    fetchResumeData()
    }, []);

  const fetchResumeData = async () => {
    var resume = await fetchResumeAutomationData(auth?.user?.userEmail);
    setFormData(resume.data)
    console.log(resume)
  }

  // Function to generate and print the resume
  const printResume = async () => {
    formData.userName = auth?.user?.userName;
    formData.userEmail = auth?.user?.userEmail;
    var response = await generateResumeAutomationData(formData);
    console.log(auth?.user?.userName);
    console.log(auth?.user?.userEmail);
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const saveResumeToDB = async () => {
    try {
      const response = await axios.post('/api/resume/save', formData);
      if (response.data.success) {
        alert('Resume saved successfully!');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume.');
    }
  };

  const downloadResumePDF = async () => {
    try {
      const response = await axios.get('/api/resume/download', {
        responseType: 'blob', // Important for downloading files
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf'); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Resume Builder</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">👤 Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.personalDetails.fullName}
                onChange={handlePersonalDetailsChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.personalDetails.contactNumber}
                onChange={handlePersonalDetailsChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email Id</label>
              <input
                type="email"
                name="emailId"
                value={formData.personalDetails.emailId}
                onChange={handlePersonalDetailsChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.personalDetails.address}
                onChange={handlePersonalDetailsChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>

        {/* Profile Summary Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">🧑‍💼 Profile Summary</h2>
          <div>
            <textarea
              name="profileSummary"
              value={formData.profileSummary}
              onChange={handleProfileSummaryChange}
              placeholder="A highly motivated software engineer with 3+ years of experience in full-stack development..."
              className="w-full px-3 py-2 border rounded-md h-32"
              required
            ></textarea>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">🎓 Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-6 p-4 border-l-4 border-blue-500 bg-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Institution Name</label>
                  <input
                    type="text"
                    name="institutionName"
                    value={edu.institutionName}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={edu.location}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Percentage/CGPA</label>
                  <input
                    type="text"
                    name="percentage"
                    value={edu.percentage}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Education
          </button>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">🛠️ Skills</h2>

          {/* Selected Skills Display */}
          {formData.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Selected Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <div key={skill.id} className="bg-blue-100 px-3 py-1 rounded-full flex items-center">
                    <span>{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      className="ml-2 text-red-600 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Skill Input */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Add Custom Skill:</h3>
            <div className="flex items-end gap-2">
              <div className="flex-grow">
                <input
                  type="text"
                  id="customSkill"
                  placeholder="Enter skill name"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="w-40">
                <select
                  id="customSkillCategory"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Programming Languages">Programming Languages</option>
                  <option value="Frameworks & Libraries">Frameworks & Libraries</option>
                  <option value="Databases">Databases</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Tools & Other">Tools & Other</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>

          {/* Available Skills */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Select from Available Skills:</h3>

            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search skills..."
                className="w-full px-3 py-2 border rounded-md"
                id="skillSearch"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  document.querySelectorAll('.skill-item').forEach((item) => {
                    const skillName = item.getAttribute('data-name').toLowerCase();
                    if (skillName.includes(searchTerm) || searchTerm === '') {
                      item.style.display = 'block';
                    } else {
                      item.style.display = 'none';
                    }
                  });
                }}
              />
            </div>

            {/* Skills by Category */}
            <div className="space-y-4">
              {Object.entries(getGroupedSkills()).map(([category, skills]) => (
                <div key={category} className="border-t pt-2">
                  <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <div
                        key={skill.id}
                        className="skill-item cursor-pointer"
                        data-name={skill.name}
                      >
                        <div
                          className={`px-3 py-1 rounded-full border ${formData.skills.some(s => s.id === skill.id)
                              ? 'bg-blue-500 text-white'
                              : 'bg-white hover:bg-gray-100'
                            }`}
                          onClick={() => toggleSkill(skill.id)}
                        >
                          {skill.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Skills Display */}
          {formData.customSkills.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium mb-2">Your Custom Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {formData.customSkills.map(skill => (
                  <div key={skill.id} className="bg-purple-100 px-3 py-1 rounded-full flex items-center">
                    <span>{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => removeCustomSkill(skill.id)}
                      className="ml-2 text-red-600 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Professional Experience Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">🏢 Professional Experience</h2>
          {formData.experience.map((exp, expIndex) => (
            <div key={expIndex} className="mb-6 p-4 border-l-4 border-green-500 bg-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={exp.jobTitle}
                    onChange={(e) => handleExperienceChange(expIndex, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={exp.companyName}
                    onChange={(e) => handleExperienceChange(expIndex, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(expIndex, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(expIndex, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date (leave blank if current)</label>
                  <input
                    type="date"
                    name="endDate"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(expIndex, e)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Responsibilities/Achievements</label>
                {exp.responsibilities.map((resp, respIndex) => (
                  <div key={respIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => handleResponsibilityChange(expIndex, respIndex, e)}
                      className="flex-grow px-3 py-2 border rounded-md mr-2"
                      required
                    />
                    {exp.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeResponsibility(expIndex, respIndex)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addResponsibility(expIndex)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Point
                </button>
              </div>

              {formData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(expIndex)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove Experience
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Experience
          </button>
        </div>

        {/* Certifications Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">📜 Certifications</h2>
          <div>
            <textarea
              name="certifications"
              value={formData.certifications}
              onChange={handleCertificationsChange}
              placeholder="AWS Certified Cloud Practitioner – AWS, Jan 2024"
              className="w-full px-3 py-2 border rounded-md h-24"
            ></textarea>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">💼 Projects</h2>
          {formData.projects.map((proj, index) => (
            <div key={index} className="mb-6 p-4 border-l-4 border-purple-500 bg-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={proj.title}
                    onChange={(e) => handleProjectChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Tech Stack Used</label>
                  <input
                    type="text"
                    name="techStack"
                    value={proj.techStack}
                    onChange={(e) => handleProjectChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={proj.startDate}
                    onChange={(e) => handleProjectChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={proj.endDate}
                    onChange={(e) => handleProjectChange(index, e)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={proj.description}
                  onChange={(e) => handleProjectChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md h-24"
                  required
                ></textarea>
              </div>
              {formData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Project
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center space-x-4">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-bold text-lg"
          >
            Download Resume pdf
          </button>
          {/* <button
            type="button"
            onClick={saveResumeToDB}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold text-lg"
          >
            Save Resume
          </button>
          <button
            type="button"
            onClick={downloadResumePDF}
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-bold text-lg"
          >
            Download PDF
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default App;