const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 27017;

app.get("/", (req, res) => {
    console.log("Helooo ");
    res.send("Welcome to the database");
});

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});