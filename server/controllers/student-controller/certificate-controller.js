const Certificate = require('../../models/Certificate');
const Assessment = require('../../models/Assessment');
const StudentCourses = require('../../models/StudentCourses');
const mongoose = require('mongoose');

exports.generateCertificate = async (req, res) => {
  try {
    const { userId, courseId, userName, courseName, certificateUrl } = req.body;

    // Input validation
    if (!userId || !courseId || !userName || !courseName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Parse IDs and validate format
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const courseObjectId = new mongoose.Types.ObjectId(courseId);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId or courseId format"
      });
    }
    
    // Check assessment status
    const courseAssessments = await Assessment.find({ 
      courseId: new mongoose.Types.ObjectId(courseId) 
    });
    
    // Get student enrollment info
    const studentCourses = await StudentCourses.findOne({
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (!studentCourses) {
      return res.status(404).json({
        success: false,
        message: "Student not enrolled in any courses"
      });
    }

    // Convert courseId to string for comparison with enrolled courses
    const courseIdStr = courseId.toString();
    const courseRecord = studentCourses.courses.find(c => 
      c.courseId && c.courseId.toString() === courseIdStr
    );
    
    if (!courseRecord) {
      return res.status(404).json({
        success: false,
        message: "Student not enrolled in this course"
      });
    }

    const completedAssessments = courseRecord.assessments || [];

    // Verify all assessments are completed and passed
    for (const assessment of courseAssessments) {
      try {
        const completed = completedAssessments.find(ca => 
          ca.assessmentId && ca.assessmentId.toString() === assessment._id.toString()
        );
        
        if (!completed) {
          return res.status(403).json({
            success: false,
            message: "All assessments must be completed before generating certificate"
          });
        }

        if (completed.score < (assessment.passingScore || 70)) {
          return res.status(403).json({
            success: false,
            message: `Must score at least ${assessment.passingScore || 70}% on all assessments`
          });
        }
      } catch (error) {
        console.error('Error checking assessment completion:', error);
        return res.status(500).json({
          success: false,
          message: "Error verifying assessment completion"
        });
      }
    }    

    // All validations passed, generate certificate
    const newCert = new Certificate({
      userId: new mongoose.Types.ObjectId(userId),
      courseId: new mongoose.Types.ObjectId(courseId),
      userName: userName.trim(),
      courseName: courseName.trim(),
      certificateUrl,
      issueDate: new Date(),
      assessmentsCompleted: completedAssessments.map(ca => ({
        assessmentId: ca.assessmentId ? new mongoose.Types.ObjectId(ca.assessmentId) : null,
        score: ca.score,
        completedAt: ca.completedAt || new Date()
      })).filter(ca => ca.assessmentId) // Remove any invalid assessment entries
    });

    await newCert.save();
    res.status(201).json({
      success: true,
      data: newCert
    });
  } catch (err) {
    console.error('Certificate generation error:', err);
    res.status(500).json({ 
      success: false,
      message: "Error generating certificate",
      error: err.message 
    });
  }
};
