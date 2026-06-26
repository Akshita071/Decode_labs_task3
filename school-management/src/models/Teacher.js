const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true, // 1:1 — one user can only have one teacher profile
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);
