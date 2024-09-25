const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");
const router = express.Router();
const { authenticateToken } = require("./user");

// Create Task
router.post("/create", authenticateToken, (req, res) => {
  const { title, description, due_date, status } = req.body;
  const taskId = uuidv4();
  const userId = req.user.id;

  db.run(
    `INSERT INTO tasks (id, title, description, due_date, status, userId) 
          VALUES (?, ?, ?, ?, ?, ?)`,
    [taskId, title, description, due_date, status, userId],
    (err) => {
      if (err) return res.status(400).json({ message: "Error creating task" });
      res.status(201).json({ message: "Task created successfully" });
    }
  );
});

// Read Tasks
router.get("/", authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.all(`SELECT * FROM tasks WHERE userId = ?`, [userId], (err, tasks) => {
    if (err) return res.status(400).json({ message: "Error fetching tasks" });
    res.status(200).json(tasks);
  });
});

// Update Task
router.put("/:id", authenticateToken, (req, res) => {
  const { title, description, due_date, status } = req.body;
  const taskId = req.params.id;
  const userId = req.user.id;

  db.run(
    `UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ? AND userId = ?`,
    [title, description, due_date, status, taskId, userId],
    (err) => {
      if (err) return res.status(400).json({ message: "Error updating task" });
      res.status(200).json({ message: "Task updated successfully" });
    }
  );
});

// Delete Task
router.delete("/:id", authenticateToken, (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  db.run(
    `DELETE FROM tasks WHERE id = ? AND userId = ?`,
    [taskId, userId],
    (err) => {
      if (err) return res.status(400).json({ message: "Error deleting task" });
      res.status(200).json({ message: "Task deleted successfully" });
    }
  );
});

module.exports = router;
