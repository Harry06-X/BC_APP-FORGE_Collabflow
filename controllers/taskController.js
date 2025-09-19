const Project = require('../models/project.model');
const Task = require('../models/task.model');

async function addTask(req, res) {
    try {
        const { projectId } = req.params;
        const { title, description, status, priority, dueDate } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const task = new Task({
            title,
            description,
            status,
            priority,
            dueDate,
            project: projectId
        });

        await task.save(); 
        res.status(201).json({ message: "Task added to project", task });
    } catch (error) {
        res.status(500).json({ message: "Error adding task", error: error.message });
    }
}

async function listTasksByProject(req, res) {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ project: projectId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
}

async function listTasks(req, res) {
    try {
        const { status, priority, sortBy, order, projectId } = req.query;

        let filter = {};
        if (status)
            filter.status = status;
        if (priority)
            filter.priority = priority;
        if (projectId)
            filter.project = projectId;

        let sortOptions = {};
        if (sortBy)
            sortOptions[sortBy] = order === "desc" ? - 1 : 1;

        //const { projectId } = req.params;
        // const tasks = await Task.find({ project: projectId });
        const tasks = await Task.find(filter).sort(sortOptions);
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

module.exports = {
    addTask,
    listTasks,
    listTasksByProject,
    updateTask,
    deleteTask
};
