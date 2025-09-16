const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await
        mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Connexion error to MongoDB :", error);
        process.exit(1);
    }
}
//connectDB();
module.exports = connectDB; 