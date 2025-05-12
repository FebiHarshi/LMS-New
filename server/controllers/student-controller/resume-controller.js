const pdf = require('html-pdf');
const { getHTMLfromFormData } = require('../../helpers/resume-helper');
const Resume = require('../../models/Resume');
const CourseProgress = require("../../models/CourseProgress");
const Course = require("../../models/Course");


exports.createResume = async (req, res) => {
    console.log(req.params);
    const formData = req.body;
    const existingResume = Resume.findById(formData._id);
    if(existingResume){
        await existingResume.deleteOne();
    }
    const resume = new Resume(formData);
    const savedResume = await resume.save();
    const completedCourses = await GetCompletedCourcesByUserId(savedResume.userId)
    formData.completedCourses = completedCourses;
    const htmlTemplate = getHTMLfromFormData(formData);

    pdf.create(htmlTemplate, {}).toFile('uploads/resume.pdf', (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.download('uploads/resume.pdf');
        }
    });
};

const GetCompletedCourcesByUserId = async (userId) => {
    let completedCourses = await CourseProgress.find({userId,completed:true})
    let courseData = []
    for(let i=0;i<completedCourses.length;i++){
        let course = await Course.findById(completedCourses[i].courseId)
        console.log(course)
        courseData.push({
            title: course.title,
            completionDate: completedCourses[i].completionDate
        })
    }
    return courseData;
}

exports.fetchResumeByEmail = async (req, res) => {
    const {userEmail} = req.body;
    const resume =await Resume.findOne({
        userEmail: userEmail
    });
    console.log(userEmail);
    console.log(resume);
    if(resume){
        return res.status(200).json({
            success: true,
            message: "",
            data: resume
        });
    }else{
        return res.status(404).json({
            success: false,
            message: "Resume not found",
          });
    }
};