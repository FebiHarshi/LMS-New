const Assessment = require("../../models/Assessment");
const StudentCourses = require("../../models/StudentCourses");

const createAssessment = async (req, res) => {
  try {
    const assessmentData = req.body;
    const newAssessment = new Assessment(assessmentData);
    const savedAssessment = await newAssessment.save();

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      data: savedAssessment,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error creating assessment",
    });
  }
};

const getAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const assessment = await Assessment.findById(id);
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: assessment,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error retrieving assessment",
    });
  }
};

const getCourseAssessments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assessments = await Assessment.find({ courseId });

    res.status(200).json({
      success: true,
      data: assessments,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error retrieving course assessments",
    });
  }
};

const updateAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const assessment = await Assessment.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assessment updated successfully",
      data: assessment,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error updating assessment",
    });
  }
};

const deleteAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const assessment = await Assessment.findByIdAndDelete(id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assessment deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error deleting assessment",
    });
  }
};

const completeAssessment = async (req, res) => {
  try {
    const { assessmentId, studentId, score } = req.body;

    // Update Assessment document
    const assessment = await Assessment.findByIdAndUpdate(
      assessmentId,
      {
        $push: {
          completedBy: {
            studentId,
            score,
            completedAt: new Date()
          }
        }
      },
      { new: true }
    );

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found"
      });
    }

    // Update StudentCourses document
    await StudentCourses.updateOne(
      { 
        userId: studentId,
        "courses.courseId": assessment.courseId 
      },
      {
        $push: {
          "courses.$.assessments": {
            assessmentId,
            score,
            completedAt: new Date()
          }
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "Assessment completed successfully",
      data: assessment
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error completing assessment"
    });
  }
};

const checkAssessmentStatus = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    
    // Get all assessments for the course
    const courseAssessments = await Assessment.find({ courseId });
    
    // Get student's course record
    const studentCourses = await StudentCourses.findOne({
      userId: studentId,
      "courses.courseId": courseId
    });

    if (!studentCourses) {
      return res.status(404).json({
        success: false,
        message: "Student not enrolled in this course"
      });
    }

    const courseRecord = studentCourses.courses.find(c => c.courseId === courseId);
    const completedAssessments = courseRecord.assessments || [];

    // Check each assessment's status
    const assessmentStatus = courseAssessments.map(assessment => {
      const completed = completedAssessments.find(ca => 
        ca.assessmentId.toString() === assessment._id.toString()
      );

      return {
        assessmentId: assessment._id,
        title: assessment.title,
        completed: !!completed,
        score: completed ? completed.score : null,
        completedAt: completed ? completed.completedAt : null,
        passingScore: assessment.passingScore || 70 // Default passing score if not specified
      };
    });

    const allCompleted = assessmentStatus.every(status => status.completed);
    const allPassed = assessmentStatus.every(status => 
      status.completed && status.score >= status.passingScore
    );

    res.status(200).json({
      success: true,
      data: {
        assessments: assessmentStatus,
        allCompleted,
        allPassed,
        eligibleForCertificate: allCompleted && allPassed
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error checking assessment status"
    });
  }
};

module.exports = {
  createAssessment,
  getAssessment,
  getCourseAssessments,
  updateAssessment,
  deleteAssessment,
  completeAssessment,
  checkAssessmentStatus,
};
