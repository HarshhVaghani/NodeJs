const { validationResult } = require("express-validator");
const Task = require("../models/Task");

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { title, description, status, priority, dueDate } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created",
      task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status, priority, sort } = req.query;

    let filter = { user: req.user._id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    let sortOption = { createdAt: -1 }; // newest first by default
    if (sort === "dueDate") sortOption = { dueDate: 1 };
    if (sort === "priority") sortOption = { priority: -1 };

    const tasks = await Task.find(filter).sort(sortOption);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Make sure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to view this task" });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid task ID" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this task" });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "Task updated", task });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid task ID" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this task" });
    }

    await task.deleteOne();

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid task ID" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
