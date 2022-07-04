const Bootcamp = require("../models/Bootcamp");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @acess   Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: "Show all bootcamps",
  });
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @acess   Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Show bootcamp ${req.params.id}`,
  });
};

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @acess   Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
    });
    console.log(`Error: ${err}`);
  }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @acess   Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id}`,
  });
};

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @acess   Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete bootcamp ${req.params.id}`,
  });
};
