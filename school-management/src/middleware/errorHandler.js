// ── Global Error Handler Middleware (Pillar 4 — Shield) ────────────────────
// Catches all errors thrown via next(err) across the application.
// Handles Mongoose-specific errors with clean, readable responses.

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose: Duplicate key (unique constraint violation)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: '${field}'. Please use a unique value.`;
    statusCode = 400;
  }

  // Mongoose: Validation error (required, min, enum, etc.)
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    statusCode = 400;
  }

  // Mongoose: Invalid ObjectId (e.g. /api/students/not-an-id)
  if (err.name === 'CastError') {
    message = `Invalid ID format: '${err.value}'`;
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
