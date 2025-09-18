const express = require("express");
const router = express.Router();
const { addTask, listTasks, listTasksByProject, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/:projectId", addTask);
router.get("/", listTasks);
router.get("/project/:projectId", listTasksByProject);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
