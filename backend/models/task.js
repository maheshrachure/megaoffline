const db = require('../config/db');

// Create task table
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
);`);

module.exports = {
    // Add methods for task operations (create, read, update, delete)
};
