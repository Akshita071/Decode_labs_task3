require('dotenv').config(); // Load .env FIRST before anything else

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Confirm DB connection before opening traffic
  } catch (error) {
    console.warn('⚠️ Continuing without a database connection. The health endpoint will still be available.');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Environment: ${process.env.NODE_ENV}`);
  });
};

startServer();
