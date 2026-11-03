const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    if (!MONGO_URI) {
        console.error('MONGO_URI is not configured.');
        return;
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
}

module.exports = connectDB;