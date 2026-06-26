const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student reference is required'],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'dropped', 'completed'],
        message: 'Status must be active, dropped, or completed',
      },
      default: 'active',
    },
  },
  { timestamps: true }
);

// ── Compound Unique Index ───────────────────────────────────────────────────
// Prevents a student from enrolling in the same course twice (Pillar 4 Shield)
enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
