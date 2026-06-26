// ── Enrollment Controller — Pillar 3: CRUD & RESTful HTTP ──────────────────
const Enrollment = require('../models/Enrollment');
const Course     = require('../models/Course');

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Public
const getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('studentId', 'fullName rollNumber')
      .populate('courseId', 'title courseCode');
    res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
  } catch (err) {
    next(err);
  }
};

// @desc    Get enrollments for a specific student
// @route   GET /api/enrollments/student/:studentId
// @access  Public
const getEnrollmentsByStudent = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.params.studentId })
      .populate('courseId', 'title courseCode description');
    res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
  } catch (err) {
    next(err);
  }
};

// @desc    Enroll a student in a course
// @route   POST /api/enrollments
// @access  Public
const createEnrollment = async (req, res, next) => {
  try {
    const { studentId, courseId } = req.body;

    // ── Capacity Check (Business Logic + Pillar 4 Shield) ──────────────────
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found.' });
    }

    const currentEnrollments = await Enrollment.countDocuments({
      courseId,
      status: 'active',
    });

    if (currentEnrollments >= course.maxCapacity) {
      return res.status(400).json({
        success: false,
        error: `Course is full. Max capacity of ${course.maxCapacity} reached.`,
      });
    }

    // ── Create Enrollment (compound unique index prevents duplicates) ───────
    const enrollment = await Enrollment.create({ studentId, courseId });

    const populated = await enrollment.populate([
      { path: 'studentId', select: 'fullName rollNumber' },
      { path: 'courseId',  select: 'title courseCode' },
    ]);

    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err); // Duplicate key error (11000) caught by errorHandler
  }
};

// @desc    Update enrollment status (active / dropped / completed)
// @route   PUT /api/enrollments/:id
// @access  Public
const updateEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!enrollment) {
      return res.status(404).json({ success: false, error: 'Enrollment not found.' });
    }
    res.status(200).json({ success: true, data: enrollment });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete enrollment by ID
// @route   DELETE /api/enrollments/:id
// @access  Public
const deleteEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ success: false, error: 'Enrollment not found.' });
    }
    res.status(200).json({ success: true, message: 'Enrollment deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEnrollments,
  getEnrollmentsByStudent,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
