require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let todos = [];

// route
app.get("/", (req, res) => {
  res.render("index", { todos });
});

// Add task
app.post("/add", (req, res) => {
  const task = req.body.task;

  if (task && task.trim() !== "") {
    todos.push(task.trim());
  }
  res.redirect("/");
});

// Edit task
app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  const updatedTask = req.body.updatedTask;

  if (updatedTask && updatedTask.trim() !== "") {
    todos[index] = updatedTask.trim();
  }
  res.redirect("/");
});

// Delete task
app.post("/delete/:index", (req, res) => {
  todos.splice(req.params.index, 1);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
