const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const { errorHandler, notFound } = require('./middleware/error.middleware');

const deviceRoutes = require('./routes/device.routes');

const app = express();

// Core middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

// Routes
app.use('/api/auth', authRoutes);

// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

app.use('/api/device', deviceRoutes);

module.exports = app;
