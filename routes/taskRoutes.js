const express = require("express");
const router = express.Router();
const { addTask, listTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", addTask);
router.get("/", listTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
