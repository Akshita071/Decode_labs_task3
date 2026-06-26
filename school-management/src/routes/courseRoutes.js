const express = require('express');
const router  = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

// POST   /api/courses        → Create course
// GET    /api/courses        → Get all courses
router.route('/').get(getAllCourses).post(createCourse);

// GET    /api/courses/:id    → Get course by ID
// PUT    /api/courses/:id    → Update course
// DELETE /api/courses/:id    → Delete course
router.route('/:id').get(getCourseById).put(updateCourse).delete(deleteCourse);

module.exports = router;
