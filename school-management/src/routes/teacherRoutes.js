const express = require('express');
const router  = express.Router();
const {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teacherController');

// POST   /api/teachers        → Create teacher
// GET    /api/teachers        → Get all teachers
router.route('/').get(getAllTeachers).post(createTeacher);

// GET    /api/teachers/:id    → Get teacher by ID
// PUT    /api/teachers/:id    → Update teacher
// DELETE /api/teachers/:id    → Delete teacher
router.route('/:id').get(getTeacherById).put(updateTeacher).delete(deleteTeacher);

module.exports = router;
