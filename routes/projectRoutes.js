const express = require("express");
const router = express.Router();
const { addProject, listProjects, getProjectWithTasks, updateProject, deleteProject } = require("../controllers/projectController");
const { addTask, listTasksByProject } = require("../controllers/taskController");

router.post("/", addProject);
router.get("/", listProjects);
router.put("/:id", getProjectWithTasks);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

router.post("/:projectId/tasks", addTask);
router.get("/:projectId/tasks", listTasksByProject)

module.exports = router;

