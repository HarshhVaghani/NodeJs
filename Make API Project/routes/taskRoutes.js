const express = require("express");
const { body } = require("express-validator");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All task routes are protected
router.use(protect);

router
  .route("/")
  .get(getTasks)
  .post(
    [body("title").notEmpty().withMessage("Task title is required")],
    createTask
  );

router
  .route("/:id")
  .get(getTaskById)
  .put(
    [
      body("status")
        .optional()
        .isIn(["pending", "in-progress", "completed"])
        .withMessage("Invalid status value"),
      body("priority")
        .optional()
        .isIn(["low", "medium", "high"])
        .withMessage("Invalid priority value"),
    ],
    updateTask
  )
  .delete(deleteTask);

module.exports = router;
