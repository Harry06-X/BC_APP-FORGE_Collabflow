const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connecte a MongoDB");
    } catch (error) {
        console.error("Erreur de connexion MongoDB :", error);
        process.exit(1);
    }
}
//connectDB();
module.exports = connectDB; 