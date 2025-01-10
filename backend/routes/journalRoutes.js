const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

// Connect to database
const db = new sqlite3.Database('./database/journal.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS JournalEntries (
            EntryID INTEGER PRIMARY KEY AUTOINCREMENT,
            EntryDate DATE NOT NULL,
            ToDoList TEXT,
            MorningMood INTEGER CHECK(MorningMood BETWEEN 1 AND 10),
            SleepScore INTEGER CHECK(SleepScore BETWEEN 1 AND 10),
            DreamNotes TEXT,
            HungerLevel INTEGER CHECK(HungerLevel BETWEEN 1 AND 10)
            );
        `);
    }
});

// POST Route - Add Journal Entry
router.post('/', (req, res) => {
    const { entryDate,ToDoList, MorningMood, SleepScore, DreamNotes,HungerLevel } = req.body;

    const sql = `INSERT INTO JournalEntries (entryDate,ToDoList, MorningMood, SleepScore, DreamNotes,HungerLevel) VALUES (?, ?, ?,?, ?, ?)`;
    const values = [entryDate,ToDoList, MorningMood, SleepScore, DreamNotes,HungerLevel];

    db.run(sql, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Journal entry added!', id: this.lastID });
        }
    });
});

// GET Route - Fetch All Journal Entries
router.get('/', (req, res) => {
    const sql = `SELECT * FROM JournalEntries`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            console.log(rows)
            res.status(200).json(rows);
        }
    });
});

module.exports = router;