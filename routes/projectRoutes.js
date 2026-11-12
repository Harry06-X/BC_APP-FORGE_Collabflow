const express = require("express");
const router = express.Router();
const { addProject, listProjects, getProjectWithTasks, updateProject, deleteProject } = require("../controllers/projectController");
const { addTask, listTasksByProject } = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { adminOnly } = require("../middleware/roles");

router.post("/", auth, addProject);
router.get("/", listProjects);
router.get("/:id", getProjectWithTasks);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, adminOnly, deleteProject);

router.post("/:projectId/tasks", auth, addTask);
router.get("/:projectId/tasks", listTasksByProject);

module.exports = router;

