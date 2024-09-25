// models/user.js
const db = require("../config/db");

db.run(
  `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  );
`,
  (err) => {
    if (err) {
      console.error("Error creating users table:", err.message);
    } else {
      console.log("Users table created or already exists.");
    }
  }
);

// models/task.js
const db = require("../config/db");

db.run(
  `
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    status TEXT,
    due_date TEXT,
    userId TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`,
  (err) => {
    if (err) {
      console.error("Error creating tasks table:", err.message);
    } else {
      console.log("Tasks table created or already exists.");
    }
  }
);
