const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require('./config/db');
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to CollabFlow API connected to MongoDB Atlas!");
});

connectDB().then(() => {
    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });
});