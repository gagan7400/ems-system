const express = require('express');
const router = express.Router();
let { createTaskController, getTasksController, getTaskByEmployeeController, allTasksController, updateEmpTaskController, updateTaskController, deleteTaskController } = require("../controllers/taskController.js")
let { authAdmin } = require("../middleware/authAdmin.js");

router.post("/createtask", authAdmin, createTaskController)
router.get("/gettask/:id", authAdmin, getTasksController)
router.get("/gettask/emp/:id", authAdmin, getTaskByEmployeeController)
router.get("/alltasks", authAdmin, allTasksController)
router.put("/updatetask/:id", authAdmin, updateTaskController)
router.put("/emp/updatetask/:id", authAdmin, updateEmpTaskController)
router.delete("/deletetask/:id", authAdmin, deleteTaskController)

module.exports = router