const express = require("express");
const {
    createResume,
    fetchResumeByEmail
} = require("../../controllers/student-controller/resume-controller");

const router = express.Router();

router.post("/generate", createResume);
router.post("/fetchByEmail", fetchResumeByEmail);

module.exports = router;
