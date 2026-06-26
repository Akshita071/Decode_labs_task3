const express = require('express');

const studentRoutes    = require('./routes/studentRoutes');
const teacherRoutes    = require('./routes/teacherRoutes');
const courseRoutes     = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const errorHandler     = require('./middleware/errorHandler');

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🏫 School Management API is running.',
    version: '1.0.0',
    endpoints: {
      students:    '/api/students',
      teachers:    '/api/teachers',
      courses:     '/api/courses',
      enrollments: '/api/enrollments',
    },
  });
});

// ── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/students',    studentRoutes);
app.use('/api/teachers',    teacherRoutes);
app.use('/api/courses',     courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// ── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

// ── Global Error Handler ────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
