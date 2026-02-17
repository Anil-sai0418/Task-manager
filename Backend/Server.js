const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Kept for health check
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const likeRoutes = require('./routes/likeRoutes');

const app = express();

// Connect to Database
connectDB();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://task-manager-anil.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Routes
// Note: Mounting at '/' to maintain existing API contract
app.use('/', authRoutes);
app.use('/', taskRoutes);
app.use('/', transactionRoutes);
app.use('/', userRoutes);
app.use('/', visitorRoutes);
app.use('/', likeRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Task Manager API is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${PORT}`);
});