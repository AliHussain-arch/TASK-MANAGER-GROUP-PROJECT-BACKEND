const User = require("../models/userModel");
const Project = require("../models/projectModel");

// Create project
const CreateProject = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const project = await Project.create({
      name: req.body.name,
      owner: req.params.userId,
    });
    res.status(201).json({ message: "Project created successfully!", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List projects
const ListProject = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.params.userId });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update project
const UpdateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.projectId, owner: req.params.userId },
      { name: req.body.name },
      { new: true },
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }
    res.status(200).json({ message: "Project updated successfully!", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete project
const DeleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.projectId,
      owner: req.params.userId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }
    res.status(200).json({ message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { CreateProject, ListProject, UpdateProject, DeleteProject };
