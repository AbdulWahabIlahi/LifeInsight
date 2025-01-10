const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

// Connect to SQLite database and ensure the Workouts table exists
const db = new sqlite3.Database('./database/journal.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS Workouts (
                WorkoutID INTEGER PRIMARY KEY AUTOINCREMENT,
                EntryID INTEGER,
                WorkoutDescription TEXT,
                FeelingBeforeWorkout INTEGER CHECK(FeelingBeforeWorkout BETWEEN 1 AND 10),
                FeelingDuringWorkout INTEGER CHECK(FeelingDuringWorkout BETWEEN 1 AND 10),
                FeelingAfterWorkout INTEGER CHECK(FeelingAfterWorkout BETWEEN 1 AND 10),
                MusclesTrained TEXT,
                WorkoutDuration INTEGER,
                FOREIGN KEY (EntryID) REFERENCES JournalEntries(EntryID)
            );
        `);
    }
});

// POST Route: Add a new workout entry
router.post('/', (req, res) => {
    const {
        EntryID,
        WorkoutDescription,
        FeelingBeforeWorkout,
        FeelingDuringWorkout,
        FeelingAfterWorkout,
        MusclesTrained,
        WorkoutDuration
    } = req.body;

    const sql = `
        INSERT INTO Workouts (
            EntryID,
            WorkoutDescription,
            FeelingBeforeWorkout,
            FeelingDuringWorkout,
            FeelingAfterWorkout,
            MusclesTrained,
            WorkoutDuration
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        EntryID,
        WorkoutDescription,
        FeelingBeforeWorkout,
        FeelingDuringWorkout,
        FeelingAfterWorkout,
        MusclesTrained,
        WorkoutDuration
    ];

    db.run(sql, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Workout entry added!', WorkoutID: this.lastID });
        }
    });
});

// GET Route: Retrieve all workout entries
router.get('/', (req, res) => {
    const sql = `SELECT * FROM Workouts`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

module.exports = router;
