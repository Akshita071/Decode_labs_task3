const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'Teacher reference is required'],
    },
    title: {
      type: String,
      required: [true, 'Course title is required'],
      unique: true,
      trim: true,
    },
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    maxCapacity: {
      type: Number,
      required: [true, 'Max capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
