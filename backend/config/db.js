const sqlite3 = require("sqlite3").verbose();

// Create and connect to the SQLite database
const db = new sqlite3.Database("./todo.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

module.exports = db;
