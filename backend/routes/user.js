const express = require("express");
const db = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs
const bcrypt = require("bcrypt"); // To hash passwords
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = uuidv4(); // Generate a unique ID for the user

  // Insert user into the database
  db.run(
    "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
    [userId, name, email, hashedPassword],
    function (err) {
      if (err) {
        return res
          .status(400)
          .json({ message: "Signup failed. Email may already exist." });
      }
      res.status(201).json({ message: "Signup successful!" });
    }
  );
});

module.exports = router;
