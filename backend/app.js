const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON bodies

// Database setup
const db = new sqlite3.Database('./database/journal.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Routes
app.post('/journal', (req, res) => {
    const { entryDate, mood, sleepScore } = req.body;
    const sql = `INSERT INTO JournalEntries (EntryDate, MorningMood, SleepScore) VALUES (?, ?, ?)`;
    const values = [entryDate, mood, sleepScore];

    db.run(sql, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Entry added!', id: this.lastID });
        }
    });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
