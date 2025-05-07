const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const { getHTMLfromFormData } = require('../../helpers/resume-helper');
const Resume = require('../../models/Resume');

exports.createResume = async (req, res) => {
    console.log(req.params);
    const formData = req.body;
    const existingResume = Resume.findById(formData._id);
    if(existingResume){
        await existingResume.deleteOne();
    }
    const resume = new Resume(formData);
    const savedResume = await resume.save();
    console.log(savedResume);
    const htmlTemplate = getHTMLfromFormData(formData);

    pdf.create(htmlTemplate, {}).toFile('uploads/resume.pdf', (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.download('uploads/resume.pdf');
        }
    });
};

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