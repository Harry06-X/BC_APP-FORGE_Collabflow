const express = require("express");
const router = express.Router();
const { addProject, listProjects, updateProject, deleteProject } = require("../controllers/projectController");

router.post("/", addProject);
router.get("/", listProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
