const Project = require('../models/project.model');

async function addProject(req, res) {
    try {
        const {title, description} = req.body;
        const project = new Project({title, description});
        await project.save();
        res.status(201).json({message: "Project added:", project});
    } catch (error) {
        res.status(500).json({message: "Error adding project", error: error.message});
    }
}

async function listProjects(req, res) {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({message: "Error fetching projects", error: error.message});
    }
}

async function updateProject(req, res) {
    try {
        const {id} = req.params;
        const {title, description} = req.body;
        const project = await Project.findByIdAndUpdate(
            id,
            {title, description},
            {new: true}
        );
        if (!project) {
            return res.status(404).json({message: "Project not found"});
        }
        res.json({message: "Project updated", project});
    } catch (error) {
        res.status(500).json({message: "Error updating project", error: error.message});
    }
}

async function deleteProject(req, res) {
    try {
        const {id} = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({message: "Project not found"});
        }
        res.json({message: `Project '${project.title}' deleted`});
    } catch (error) {
        res.status(500).json({message: "Error deleting project", error: error.message});
    }
}

module.exports = {addProject, listProjects, updateProject, deleteProject};
