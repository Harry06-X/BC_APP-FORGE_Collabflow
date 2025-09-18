const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to CollabFlow API connected to MongoDB Atlas!!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});