const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await
        mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}
//connectDB();
module.exports = connectDB; 