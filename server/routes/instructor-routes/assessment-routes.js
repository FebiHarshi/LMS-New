const express = require("express");
const {
  createAssessment,
  getAssessment,
  getCourseAssessments,
  updateAssessment,
  deleteAssessment,
  completeAssessment,
  checkAssessmentStatus,
} = require("../../controllers/instructor-controller/assessment-controller");

const router = express.Router();

router.post("/create", createAssessment);
router.get("/get/:id", getAssessment);
router.get("/course/:courseId", getCourseAssessments);
router.get("/course/:courseId/status/:studentId", checkAssessmentStatus);
router.put("/update/:id", updateAssessment);
router.delete("/delete/:id", deleteAssessment);
router.post("/complete", completeAssessment);

module.exports = router;
