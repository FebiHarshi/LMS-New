const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  
exports.getHTMLfromFormData = (formData) =>{

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${formData.personalDetails.fullName} - Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            margin-bottom: 5px;
            color: #2c3e50;
          }
          .contact-info {
            text-align: center;
            margin-bottom: 20px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
            color: #2c3e50;
          }
          .education-item, .experience-item, .project-item {
            margin-bottom: 15px;
          }
          .item-title {
            font-weight: bold;
          }
          .item-subtitle {
            font-style: italic;
          }
          .responsibility {
            margin-left: 20px;
          }
          .skills-container {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 15px;
          }
          .skill-category {
            margin-bottom: 10px;
            width: 100%;
          }
          .skill-category-title {
            font-weight: bold;
            margin-bottom: 5px;
          }
          .skill-tag {
            background-color: #f0f0f0;
            border-radius: 4px;
            padding: 3px 8px;
            margin: 2px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        ${GetHeaderSection(formData)}
        
        ${GetProfileSummarySection(formData)}
        
        ${GetEducationSection(formData)}
        
        ${GetSkillsSection(formData)}

        ${GetCoursesSection(formData)}
        
        ${GetExperienceSection(formData)}
        
        ${GetCertificationSection(formData)}
        
        ${GetProjectsSection(formData)}
        
      </body>
      </html>
    `
}

const GetHeaderSection = (formData) => {

  return `<div class="header">
          <h1>${formData.personalDetails.fullName}</h1>
        </div>
        
        <div class="contact-info">
          ${formData.personalDetails.contactNumber} | 
          ${formData.personalDetails.emailAddress} | 
          <a href="${formData.personalDetails.linkedinUrl}" target="_blank">LinkedIn</a>
        </div>`
}

const GetProfileSummarySection = (formData) => {

  return `<div class="section">
          <h2 class="section-title">Profile Summary</h2>
          <p>${formData.profileSummary}</p>
        </div>`
}

const GetEducationSection = (formData) => {

  return `<div class="section">
          <h2 class="section-title">Education</h2>
          ${formData.education.map(edu => `
            <div class="education-item">
              <div class="item-title">${edu.degree}</div>
              <div class="item-subtitle">${edu.institutionName}, ${edu.location}</div>
              <div>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</div>
              <div>CGPA/Percentage: ${edu.percentage}</div>
            </div>
          `).join('')}
        </div>`
}

const GetSkillsSection = (formData) => {

  return `<div class="section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-container">
            ${(() => {
              // Group skills by category
              const skillsByCategory = {};
              formData.skills.forEach(skill => {
                if (!skillsByCategory[skill.category]) {
                  skillsByCategory[skill.category] = [];
                }
                skillsByCategory[skill.category].push(skill);
              });
              
              // Generate HTML for each category
              return Object.keys(skillsByCategory).map(category => `
                <div class="skill-category">
                  <div class="skill-category-title">${category}:</div>
                  <div>
                    ${skillsByCategory[category].map(skill => `
                      <span class="skill-tag">${skill.name}</span>
                    `).join('')}
                  </div>
                </div>
              `).join('');
            })()}
          </div>
        </div>`
}

const GetExperienceSection = (formData) => {
  if(!formData.experience) return '';
  return `<div class="section">
          <h2 class="section-title">Professional Experience</h2>
          ${formData.experience.map(exp => `
            <div class="experience-item">
              <div class="item-title">${exp.jobTitle}</div>
              <div class="item-subtitle">${exp.companyName}, ${exp.location}</div>
              <div>${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</div>
              <ul>
                ${exp.responsibilities.map(resp => `
                  <li>${resp}</li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>`
}

const GetCertificationSection = (formData)=>{
  if(!formData.certifications) return '';
  return `<div class="section">
          <h2 class="section-title">Certifications</h2>
          <p>${formData.certifications}</p>
        </div>`
}

const GetProjectsSection = (formData) => {
  if(!formData.projects) return '';
  return `<div class="section">
          <h2 class="section-title">Projects</h2>
          ${formData.projects.map(proj => `
            <div class="project-item">
              <div class="item-title">${proj.title}</div>
              <div><strong>Tech Stack:</strong> ${proj.techStack}</div>
              <div><strong>Duration:</strong> ${formatDate(proj.startDate)} - ${formatDate(proj.endDate)}</div>
              <div><strong>Description:</strong> ${proj.description}</div>
              <div><strong>Contributions:</strong> ${proj.contributions}</div>
            </div>
          `).join('')}
        </div>`
}

const GetCoursesSection = (formData) => {
  if(!formData.completedCourses) return '';
  return `<div class="section">
          <h2 class="section-title">Courses Completed</h2>
          <ul>
          ${formData.completedCourses.map(course => `
            <li> Completed the course ${course.title} on ${formatDate(course.completionDate)} </li>
          `).join('')}
          </ul>
        </div>`
}