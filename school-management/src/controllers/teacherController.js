// ── Teacher Controller — Pillar 3: CRUD & RESTful HTTP ─────────────────────
const Teacher = require('../models/Teacher');
const User    = require('../models/User');

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Public
const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().populate('userId', 'email role');
    res.status(200).json({ success: true, count: teachers.length, data: teachers });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single teacher by ID
// @route   GET /api/teachers/:id
// @access  Public
const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('userId', 'email role');
    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Teacher not found.' });
    }
    res.status(200).json({ success: true, data: teacher });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new teacher (also creates linked User account)
// @route   POST /api/teachers
// @access  Public
const createTeacher = async (req, res, next) => {
  try {
    const { email, password, fullName, employeeId, specialization, phone } = req.body;

    // Step 1: Create the User (auth layer)
    const user = await User.create({ email, password, role: 'teacher' });

    // Step 2: Create the Teacher profile linked to that User
    const teacher = await Teacher.create({
      userId: user._id,
      fullName,
      employeeId,
      specialization,
      phone,
    });

    res.status(201).json({ success: true, data: teacher });
  } catch (err) {
    next(err);
  }
};

// @desc    Update teacher by ID
// @route   PUT /api/teachers/:id
// @access  Public
const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Teacher not found.' });
    }
    res.status(200).json({ success: true, data: teacher });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete teacher by ID
// @route   DELETE /api/teachers/:id
// @access  Public
const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Teacher not found.' });
    }
    res.status(200).json({ success: true, message: 'Teacher deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher };
