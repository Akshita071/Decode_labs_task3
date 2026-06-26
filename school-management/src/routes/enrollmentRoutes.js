const express = require('express');
const router  = express.Router();
const {
  getAllEnrollments,
  getEnrollmentsByStudent,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = require('../controllers/enrollmentController');

// POST   /api/enrollments                        → Enroll student in course
// GET    /api/enrollments                        → Get all enrollments
router.route('/').get(getAllEnrollments).post(createEnrollment);

// GET    /api/enrollments/student/:studentId     → Get enrollments by student
router.get('/student/:studentId', getEnrollmentsByStudent);

// PUT    /api/enrollments/:id                    → Update enrollment status
// DELETE /api/enrollments/:id                    → Delete enrollment
router.route('/:id').put(updateEnrollment).delete(deleteEnrollment);

module.exports = router;
