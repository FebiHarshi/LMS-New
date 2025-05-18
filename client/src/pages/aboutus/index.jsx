import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us | EduConnect</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold text-gray-700">Transforming Education for the Future</h2>
      </div>

      <div className="mb-16">
        <p className="text-lg text-gray-600 mb-6">
          At EduConnect, we're reimagining how learning happens in the digital age. Our comprehensive 
          Learning Management System bridges the gap between education and career advancement, 
          serving both students eager to learn and instructors passionate about teaching.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-600">
          We believe quality education should be accessible, manageable, and directly connected to 
          real-world success. EduConnect was founded on a simple but powerful vision: to create a 
          platform where learning thrives, knowledge is easily shared, and accomplishments translate 
          into career opportunities.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Who We Serve</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">For Students</h3>
            <p className="text-gray-700">
              We empower learners with intuitive tools to discover courses aligned with their goals, 
              track progress in real-time, showcase achievements through verifiable certifications, 
              and build professional resumes that highlight their growing expertise. Your learning 
              journey becomes a seamless path to professional growth.
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">For Instructors</h3>
            <p className="text-gray-700">
              We provide educators with powerful yet simple tools to create engaging content, 
              design meaningful assessments, monitor student progress, and make data-driven 
              teaching decisions. Our platform handles the technical complexities so you can 
              focus on what matters most—inspiring your students.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">What Sets Us Apart</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Accessibility First</h3>
            <p className="text-gray-600">
              Education should have no barriers. Our platform is designed with accessibility in mind, 
              ensuring all users—regardless of background, device, or learning style—can easily 
              navigate their educational journey.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Career-Focused Learning</h3>
            <p className="text-gray-600">
              We've reimagined the connection between education and professional advancement. 
              Every feature, from course design to certification, is built with career outcomes in mind.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Modern Technology Foundation</h3>
            <p className="text-gray-600">
              Built on the robust MERN stack (MongoDB, Express.js, React, Node.js), our platform 
              delivers a responsive, reliable experience that evolves with technological advances 
              and user needs.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">User Experience at the Core</h3>
            <p className="text-gray-600">
              We obsess over making complex educational processes intuitive. Every button, page, 
              and feature is thoughtfully designed to enhance learning and teaching, not complicate it.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Mobile-First Design</h3>
            <p className="text-gray-600">
              Learning happens everywhere. Our responsive design ensures you have the same powerful 
              experience whether you're on a desktop at home, a tablet in the library, or a 
              smartphone on the go.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Key Features</h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">Seamless Course Management</h3>
              <p className="mt-2 text-gray-600">Discover, enroll in, and navigate courses with intuitive interfaces</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">Comprehensive Assessment Tools</h3>
              <p className="mt-2 text-gray-600">Create, take, and evaluate assessments that truly measure understanding</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">Real-Time Progress Tracking</h3>
              <p className="mt-2 text-gray-600">Visualize learning progress through insightful dashboards and analytics</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">Verifiable Digital Certifications</h3>
              <p className="mt-2 text-gray-600">Earn and share credentials that employers recognize and trust</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">Integrated Resume Building</h3>
              <p className="mt-2 text-gray-600">Transform educational achievements into professional opportunities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Join Our Learning Community</h2>
        <p className="text-lg mb-6">
          EduConnect isn't just a platform—it's a growing community of learners and educators 
          committed to excellence. Whether you're taking your first online course or you're a 
          seasoned instructor developing your tenth curriculum, you'll find the tools, support, 
          and inspiration you need to succeed.
        </p>
        <p className="text-lg mb-8">
          We're constantly evolving based on user feedback and educational research. As we grow, 
          our commitment remains unwavering: to make quality education more accessible, manageable, 
          and connected to meaningful outcomes.
        </p>
        <p className="text-xl font-semibold">
          Ready to transform your educational journey? Join us at EduConnect, where learning connects to opportunity.
        </p>
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>

      <div className="text-center border-t border-gray-200 pt-8">
        <p className="text-xl font-semibold text-gray-700 italic">EduConnect: Learn. Connect. Succeed.</p>
      </div>
    </div>
  );
};

export default AboutUs;