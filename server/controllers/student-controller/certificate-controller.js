const Certificate = require('../../models/Certificate');

exports.generateCertificate = async (req, res) => {
  try {
    const { userId, courseId, userName, courseName, certificateUrl } = req.body;

    const newCert = new Certificate({
      userId,
      courseId,
      userName,
      courseName,
      certificateUrl,
    });

    await newCert.save();
    res.status(201).json(newCert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
