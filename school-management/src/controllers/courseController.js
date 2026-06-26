// ── Course Controller — Pillar 3: CRUD & RESTful HTTP ──────────────────────
const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('teacherId', 'fullName employeeId specialization');
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacherId', 'fullName employeeId specialization');
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found.' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Public
const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

// @desc    Update course by ID
// @route   PUT /api/courses/:id
// @access  Public
const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found.' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete course by ID
// @route   DELETE /api/courses/:id
// @access  Public
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found.' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
