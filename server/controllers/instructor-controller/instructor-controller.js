const Instructor = require("../../models/Instructor");

const getInstructorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findById(id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: instructor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching instructor details",
    });
  }
};

module.exports = {
  getInstructorDetails,
};