const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/journal.db");
// Get all journal entries
router.get("/", (req, res) => {
  const query = "SELECT * FROM Journal";
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new journal entry
router.post("/journal", (req, res) => {
  const { EntryDate, ToDoList, MorningMood, SleepScore, DreamNotes, HungerLevel } = req.body;
  const query = `INSERT INTO Journal (EntryDate, ToDoList, MorningMood, SleepScore, DreamNotes, HungerLevel)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [EntryDate, ToDoList, MorningMood, SleepScore, DreamNotes, HungerLevel];

  db.run(query, values, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Entry added", id: this.lastID });
  });
});

// Delete a journal entry
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Journal WHERE EntryID = ?";
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Entry deleted" });
  });
});

module.exports = router;
