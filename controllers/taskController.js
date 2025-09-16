const Task = require('../models/task.model');

async function addTask(req, res) {
    try {
        const { title, description, status, priority } = req.body;
        const task = new Task({ title, description, status, priority });
        await task.save();
        res.status(201).json({ message: "Task added:", task });
    } catch (error) {
        res.status(500).json({ message: "Error adding task", error: error.message });
    }
}

async function listTasks(req, res) {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { title, status } = req.body;
        const task = await Task.findByIdAndUpdate(
            id,
             {title, status },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task updated", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating tasks", error: error.message });
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: `Task '${task.title}' deleted` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting tasks", error: error.message });
    }
}

module.exports = {addTask, listTasks, updateTask, deleteTask};
