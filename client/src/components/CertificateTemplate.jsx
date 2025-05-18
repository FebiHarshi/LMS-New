import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { generateCertificate } from '@/services';

const CertificateTemplate = ({ userName, courseName, userId, courseId, courseDescription, instructorName, existingCertificate }) => {
  const certRef = useRef();
  const handleGenerate = async () => {
    if (existingCertificate) {
      alert('Certificate already exists!');
      return;
    }

    if (!userName || !courseId || !userId || !courseName) {
      alert('Missing required information for certificate generation');
      return;
    }
    
    const canvas = await html2canvas(certRef.current);
    const imgData = canvas.toDataURL('image/png');

    // Save to backend
    try {
      const response = await generateCertificate({
        userId: userId.toString(),
        courseId: courseId.toString(),
        userName: userName.trim(),
        courseName: courseName.trim(),
        certificateUrl: imgData,
      });

      if (response.success) {
        alert('Certificate Generated Successfully!');
        window.location.reload(); // Reload to show the new certificate
      } else {
        alert(response.message || 'Failed to generate certificate. Please try again.');
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert('Failed to generate certificate. Please try again.');
      }
    }
  };
  const handleDownload = async () => {
    try {
      // If we have an existing certificate, download that
      if (existingCertificate?.certificateUrl) {
        const link = document.createElement('a');
        link.href = existingCertificate.certificateUrl;
        link.download = `${courseName}-certificate.png`;
        link.click();
        return;
      }

      // Otherwise generate from current view
      const canvas = await html2canvas(certRef.current);
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${courseName}-certificate.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  };

  return (
    <div>
      <div className="relative max-w-4xl mx-auto bg-white p-12 shadow-xl">
        {/* Decorative Border */}
        <div className="absolute inset-0 p-4">
          <div className="border-8 border-double border-blue-800 h-full w-full rounded-lg p-2">
            <div className="border-2 border-blue-600 h-full w-full rounded-sm p-2">
              <div className="border-1 border-blue-400 border-dashed h-full w-full rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-blue-800"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-blue-800"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-blue-800"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-blue-800"></div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div ref={certRef} className="bg-white p-10 w-[800px] h-[800px] border-4 border-blue-200 shadow-xl text-center">
          <div className="flex justify-center mb-4">
            <div className="h-1 w-24 bg-blue-800 mr-3 mt-4"></div>
            <h1 className="text-4xl font-bold text-blue-800">Certificate of Achievement</h1>
            <div className="h-1 w-24 bg-blue-800 ml-3 mt-4"></div>
          </div>
          <br></br>
            <p className="mt-4 text-2xl">Awarded to</p>
            <br></br>
            <h1 className="text-4xl font-bold text-blue-900 my-4 italic">{userName}</h1>
            <br></br>
            <p className="mt-4 text-xl">has successfully completed</p>
            <br></br>
            <h2 className="text-3xl font-bold text-blue-800 my-4">{courseName}</h2>
    
            {/* Course Description */}
      <div className="mt-8 text-left px-8">
              <p className="text-gray-700 leading-relaxed text-sm">In this Course,{courseDescription}</p>
            </div>
            <br></br>
            <p className="mt-4 text-sm">Issued on: {existingCertificate ? new Date(existingCertificate.issueDate).toLocaleDateString() : new Date().toLocaleDateString()}</p>
            {/* Certificate Statement */}
            <div className="text-center italic mb-10 text-gray-600">
              <p>This certificate verifies the completion of all required coursework and assessments as specified by the curriculum.</p>
              {existingCertificate?.assessmentsCompleted && existingCertificate.assessmentsCompleted.length > 0 && (
                <p className="mt-2 font-medium text-blue-600">
                  Completed {existingCertificate.assessmentsCompleted.length} Assessment{existingCertificate.assessmentsCompleted.length > 1 ? 's' : ''} with Average Score: {
                    Math.round(existingCertificate.assessmentsCompleted.reduce((acc, curr) => acc + curr.score, 0) / existingCertificate.assessmentsCompleted.length)
                  }%
                </p>
              )}
            </div>
          
            {/* Signatures Section */}
            <div className="flex justify-between mb-6">
              <div className="text-center">
                <div className="h-12 flex items-end justify-center border-b border-black mb-2">
                  <p className="font-serif italic text-xl">{instructorName || 'Course Instructor'}</p>
                </div>
                <p className="text-sm text-gray-600">Course Instructor</p>
              </div>
              <div className="text-center">
                <div className="h-12 flex items-end justify-center border-b border-black mb-2">
                  <p className="font-serif italic text-xl">LMS LEARN</p>
                </div>
                <p className="text-sm text-gray-600">Organization</p>
              </div>
              <div className="text-center">
                <div className="h-12 flex items-end justify-center border-b border-black mb-2">
                <p className="font-serif italic text-xl">Program Director</p>
                </div>
                <p className="text-sm text-gray-600">Administration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative Line */}
      <div className="flex justify-center my-6">
        <div className="h-px w-full bg-gradient-to-r from-white via-blue-800 to-white"></div>
      </div>      <div className="flex justify-center items-center">
        {!existingCertificate ? (
          <button 
            onClick={handleGenerate} 
            className="mt-5 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Generate Certificate
          </button>
        ) : (
          <div className="text-green-600 font-medium mt-5 mr-4">
            Certificate Generated on {new Date(existingCertificate.issueDate).toLocaleDateString()}
          </div>
        )}
        <div className="mx-2"></div>
        <button 
          onClick={handleDownload} 
          className="mt-5 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateTemplate;
