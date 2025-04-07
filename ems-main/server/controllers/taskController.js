let Task = require('../models/taskModel');

let createTaskController = async (req, res) => {
    try {
        let { title, description, assignedTo, dueDate, status } = req.body;
        if (!title || !description || !assignedTo || !dueDate || !status) {
            return res.status(400).json({ result: false, message: "Please Provide All details" });
        }
        let newTask = await Task({ title, description, assignedTo, dueDate, status });
        await newTask.save();
        return res.status(200).json({ result: true, message: "Task Create Successfully" });
    } catch (error) {
        return res.status(400).json({ result: false, message: error.message });
    }
}
let getTasksController = async (req, res) => {
    try {
        let { id } = req.params;
        let task = await Task.findById(id);
        if (!task) {
            return res.status(400).json({ result: false, message: "Task Not Found" })
        }
        return res.status(200).json({ result: true, message: "data fetch succesfully", data: task })
    } catch (error) {
        return res.status(400).json({ result: false, message: error.message });
    }
}
let getTaskByEmployeeController = async (req, res) => {
    try {
        var assignedTo = req.params.id;
        let task = await Task.find({ assignedTo });

        if (!task) {
            return res.status(400).json({ result: false, message: "Task Not Found" })
        }
        return res.status(200).json({ result: true, message: "Task Found", data: task })
    } catch (error) {
        return res.status(400).json({ result: false, message: error.message, });
    }
}

let allTasksController = async (req, res) => {
    try {
        let alltasks = await Task.find();
        return res.status(200).json({ result: true, message: "data fetch succesfully", data: alltasks })
    } catch (error) {
        return res.status(400).json({ result: false, message: error.message });
    }
}
let updateTaskController = async (req, res) => {
    try {
        let { id } = req.params;
        let task = await Task.findById(id);
        if (!task) {
            return res.status(400).json({ result: false, message: "Task Not Found" })
        }
        await Task.findByIdAndUpdate(id, { ...req.body })
        return res.status(200).json({ result: true, message: "Task Update Successfully" });
    } catch (error) {
        return res.status(400).json({ result: false, message: error.message });
    }
}
let deleteTaskController = async (req, res) => {
    try {
        let { id } = req.params;
        let task = await Task.findById(id);
        if (!task) {
            return res.status(400).json({ result: false, message: "Task Not Found" })
        }
        await Task.findByIdAndDelete(id);
        return res.status(200).json({ result: true, message: "Task Delete Successfully" });
    } catch (error) {
        return res.status(400).json({ result: false, message: error.message });
    }
}

module.exports = { getTaskByEmployeeController, createTaskController, getTasksController, allTasksController, updateTaskController, deleteTaskController }