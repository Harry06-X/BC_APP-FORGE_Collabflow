const express = require("express");
const router = express.Router();
const { addTask, listTasks, listTasksByProject, updateTask, deleteTask } = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { adminOnly } = require("../middleware/roles");

router.post("/:projectId", auth, addTask);
router.get("/", listTasks);
router.get("/project/:projectId", listTasksByProject);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, adminOnly, deleteTask);

module.exports = router;
