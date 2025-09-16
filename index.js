const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require('./config/db');
dotenv.config();
const port = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to the database!");
});

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening at http://localhost:${port}`);
});