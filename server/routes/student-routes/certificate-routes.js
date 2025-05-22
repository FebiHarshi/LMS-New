const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { generateCertificate } = require('../../controllers/student-controller/certificate-controller');
const Course = require('../../models/Course');
const Certificate = require('../../models/Certificate');

// Generate certificate
router.post('/generate', generateCertificate);

// Get certificate and course info
router.get('/:courseId', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.query.userId;

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID format"
            });
        }
        
        // Get course details
        const course = await Course.findById(courseId)
            .populate('instructorId', 'fullName');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Get certificate if it exists
        const certificate = await Certificate.findOne({ 
            courseId: courseId,
            userId: userId
        });

        res.json({
            success: true,
            data: {
                ...course.toObject(),
                instructorName: course.instructorId?.fullName || 'Unknown Instructor',
                certificate: certificate
            }
        });
    } catch (err) {
        console.error('Error in certificate route:', err);
        res.status(500).json({
            success: false,
            message: "Error retrieving course and certificate details"
        });
    }
});

module.exports = router;
