const express = require("express");
const router = express.Router();
const { addProject, listProjects, getProjectWithTasks, updateProject, deleteProject } = require("../controllers/projectController");
const { addTask, listTasksByProject } = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { adminOnly } = require("../middleware/roles");

router.post("/", auth, addProject);
router.get("/", listProjects);
router.put("/:id", auth, getProjectWithTasks);
router.put("/:id", updateProject);
router.delete("/:id", auth, adminOnly, deleteProject);

router.post("/:projectId/tasks", addTask);
router.get("/:projectId/tasks", listTasksByProject)

module.exports = router;

