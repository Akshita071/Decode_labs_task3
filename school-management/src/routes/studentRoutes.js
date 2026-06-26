const express = require('express');
const router  = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// POST   /api/students        → Create student
// GET    /api/students        → Get all students
router.route('/').get(getAllStudents).post(createStudent);

// GET    /api/students/:id    → Get student by ID
// PUT    /api/students/:id    → Update student
// DELETE /api/students/:id    → Delete student
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent);

module.exports = router;
