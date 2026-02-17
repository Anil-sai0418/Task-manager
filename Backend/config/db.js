const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });
        console.log("✅ MongoDB is connected successfully!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        console.error("Please check:");
        console.error("1. Your internet connection");
        console.error("2. MongoDB Atlas IP whitelist settings");
        console.error("3. Your cluster is running (not paused)");
        console.error("4. Your connection string is correct");
        process.exit(1);
    }
};

module.exports = connectDB;
