const User = require("../models/userModel");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

// Create task under a project
const CreateTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      projectId: req.params.projectId,
    });

    res.status(201).json({ message: "Task created successfully!", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List tasks under a project
const ListTasks = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }
    const tasks = await Task.find({ projectId: req.params.projectId });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a single task
const UpdateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      },
      { new: true },
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json({ message: "Task updated successfully!", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a single task
const DeleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      projectId: req.params.projectId,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { CreateTask, ListTasks, UpdateTask, DeleteTask };
