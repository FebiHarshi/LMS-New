const mongoose = require("mongoose");

const StudentCoursesSchema = new mongoose.Schema({
  userId: String,
  courses: [
    {
      courseId: String,
      title: String,
      instructorId: String,
      instructorName: String,
      dateOfPurchase: Date,
      courseImage: String,
      assessments: [
        {
          assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
          score: Number,
          completedAt: Date
        }
      ]
    },
  ],
});

module.exports = mongoose.model("StudentCourses", StudentCoursesSchema);
