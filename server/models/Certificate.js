const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  userName: String,
  courseName: String,
  issueDate: { type: Date, default: Date.now },
  certificateUrl: String,
});

module.exports = mongoose.model('Certificate', CertificateSchema);
