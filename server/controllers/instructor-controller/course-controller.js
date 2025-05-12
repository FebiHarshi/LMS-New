const Course = require("../../models/Course");
const CourseProgress = require("../../models/CourseProgress");
const User = require("../../models/User");

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course saved successfully",
        data: saveCourse,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const coursesList = await Course.find({});

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getCourseDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateCourseByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
const getAllCourseProgess = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log(courses);
    const resultCources = courses.map(x=>(
      {
        id:x._id,
        name:x.title,
        modules: x.curriculum.map(y=>(
          {
            id:y._id,
            name:y.title
          }
        ))
      }
    ))
    //const progress = await CourseProgress.find()
    const users = await User.find({role:'user'})
    const students = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const progress = await CourseProgress.find({userId:user._id})
      //console.log(`progess ${progress} ${user._id}`)
      let enrollments = []
      if(progress){
        for(let j=0;j<progress.length;j++){
          let p = progress[j];
          p.progress=[];
          let course = resultCources.find(x=>x.id==p.courseId);
          console.log(course)
          for(let k=0;k<course.modules.length;k++){
            let lp = p.lecturesProgress.find(x=>x.lectureId==course.modules[k].id);
            let viewed = lp?.viewed ? 100 :0;
            p.progress.push({
              moduleId:course.modules[k].id,
              completion:viewed
            })
          }
          console.log(p.lecturesProgress)
          enrollments.push({
            courseId:p.courseId,
            progress: p.progress
          })
        }
      }
      students.push({
        id:user._id,
        fullName:user.userName,
        enrollments:enrollments,
      })
    }
    const response = {
      courses: resultCources,
      students: students
    }
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  updateCourseByID,
  getCourseDetailsByID,
  getAllCourseProgess
};