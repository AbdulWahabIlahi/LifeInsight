const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

// Connect to SQLite database and ensure the table exists
const db = new sqlite3.Database('./database/journal.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS Meals (
                EntryID INTEGER PRIMARY KEY AUTOINCREMENT,
                MealTime TEXT CHECK(MealTime IN ('Breakfast', 'Lunch', 'Dinner')),
                FoodDescription TEXT,
                Macros TEXT,
                Micros TEXT,
                FeelingAfterMeal INTEGER CHECK(FeelingAfterMeal BETWEEN 1 AND 10)
            );
        `);
    }
});

// POST Route: Add a new meal entry
router.post('/', (req, res) => {
    const { MealTime, FoodDescription, Macros, Micros, FeelingAfterMeal } = req.body;

    // SQL query without EntryID
    const sql = `INSERT INTO Meals (MealTime, FoodDescription, Macros, Micros, FeelingAfterMeal) VALUES (?, ?, ?, ?, ?)`;
    const values = [MealTime, FoodDescription, Macros, Micros, FeelingAfterMeal];

    db.run(sql, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Meal entry added!', EntryID: this.lastID });
        }
    });
});

// GET Route: Retrieve all meal entries
router.get('/', (req, res) => {
    const sql = `SELECT * FROM Meals`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

module.exports = router;
