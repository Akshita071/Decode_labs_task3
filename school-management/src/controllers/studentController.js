// ── Student Controller — Pillar 3: CRUD & RESTful HTTP ─────────────────────
const Student = require('../models/Student');
const User    = require('../models/User');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('userId', 'email role');
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate('userId', 'email role');
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found.' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new student (also creates linked User account)
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res, next) => {
  try {
    const { email, password, fullName, rollNumber, dateOfBirth, age, phone, address } = req.body;

    // Step 1: Create the User (auth layer)
    const user = await User.create({ email, password, role: 'student' });

    // Step 2: Create the Student profile linked to that User
    const student = await Student.create({
      userId: user._id,
      fullName,
      rollNumber,
      dateOfBirth,
      age,
      phone,
      address,
    });

    res.status(201).json({ success: true, data: student });
  } catch (err) {
    next(err); // Handled by errorHandler (duplicate key, validation, etc.)
  }
};

// @desc    Update student by ID
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // runValidators: re-applies schema rules on update
    );
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found.' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete student by ID
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found.' });
    }
    res.status(200).json({ success: true, message: 'Student deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
