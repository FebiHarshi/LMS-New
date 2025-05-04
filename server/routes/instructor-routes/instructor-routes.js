const express = require("express");
const { getInstructorDetails } = require("../../controllers/instructor-controller/instructor-controller");
const router = express.Router();

router.get("/get/details/:id", getInstructorDetails);

module.exports = router;