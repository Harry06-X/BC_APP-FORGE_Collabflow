const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:"*",
        methods:["GET", "POST"]
    }
});
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

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinProject", (projectId) => {
        socket.join(projectId);
        console.log(`User joined project room: ${projectId}`);
    });

    socket.on("sendMessage", (data) => {
        console.log("New message:", data);
        io.to(data.projectId).emit("receiveMessage", {
            user: data.user,
            message: data.message,
            time: new Date()
        });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});