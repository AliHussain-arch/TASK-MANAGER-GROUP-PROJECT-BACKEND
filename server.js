// Importing dotenv
const dotenv = require("dotenv");
dotenv.config();

// Importing express
const express = require("express");
const app = express();

// JSON parsing middleware
app.use(express.json());

// Importing cors
const cors = require("cors");
app.use(cors());

// Importing bycrypt
const bcrypt = require("bcrypt");

// Importing mongoose
const mongoose = require("mongoose");

// Importing morgan and setting up morgan middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// Importing monogoDB connection
const database = require("./config/database");

// Importing jsonwebtoken
const jwt = require("jsonwebtoken");

// Importing models
const User = require("./models/userModel");
const Project = require("./models/projectModel");
const Task = require("./models/taskModel");

// Import authentication controllers
const authenticationControllers = require("./controllers/authenticationControllers");

// setting up signup route
app.post("/signup", authenticationControllers.signup);

// setting up sign in route
app.post("/signin", authenticationControllers.signin);

// Token authentication middleware
const authenticateToken = require("./middleware/authenticateToken");
app.use(authenticateToken);

// Protected routes

// Importing project controllers
const projectControllers = require("./controllers/projectControllers");

// Project routes

// Create project
app.post("/:userId/projects", projectControllers.CreateProject);

// List projects
app.get("/:userId/projects", projectControllers.ListProject);

// Update project
app.put("/:userId/projects/:projectId", projectControllers.UpdateProject);

// Delete project
app.delete("/:userId/projects/:projectId", projectControllers.DeleteProject);

// Importing task controllers
const taskControllers = require("./controllers/taskControllers");
// Task routes

// Create task under a project

app.post("/:userId/projects/:projectId/tasks", taskControllers.CreateTask);

// List tasks under a project
app.get("/:userId/projects/:projectId/tasks", taskControllers.ListTasks);

// Update a single task
app.put(
  "/:userId/projects/:projectId/tasks/:taskId",
  taskControllers.UpdateTask,
);

// Delete a single task
app.delete(
  "/:userId/projects/:projectId/tasks/:taskId",
  taskControllers.DeleteTask,
);

// Setting up port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
