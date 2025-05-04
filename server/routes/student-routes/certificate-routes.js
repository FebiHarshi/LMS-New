const express = require('express');
const router = express.Router();
const { generateCertificate } = require('../../controllers/student-controller/certificate-controller');
const Course = require('../../models/Course');
const Certificate = require('../../models/Certificate');

router.post('/generate', generateCertificate);

module.exports = router;
router.post('/:id', async (req, res) => {
    try {
      console.log(req.params.id);
      Certificate.create({
        userId: req.body.userId,
        courseId: req.body.courseId,
        certificateUrl: req.body.certificateUrl,
      });
      const course = await Course.findById(req.params.id);
      res.json(course);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Course not found' });
    }
  });
  