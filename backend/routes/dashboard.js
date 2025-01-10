const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('/home/sasuke/myspace/LifeInsight/backend/database/journal.db');

router.get('/combine', async (req, res) => {
    try {
        // Fetch journal entries
        const journalEntries = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM JournalEntries', (err, rows) => {
                if (err) {
                    console.error('Error fetching journal entries:', err.message);
                    reject(err); // Reject the promise if there's an error
                } else {
                    console.log('Fetched journal entries:', rows); // Log the fetched data
                    resolve(rows); // Resolve with the data
                }
            });
        });

        // Fetch meals
        const meals = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM Meals', (err, rows) => {
                if (err) {
                    console.error('Error fetching meals:', err.message);
                    reject(err); // Reject the promise if there's an error
                } else {
                    console.log('Fetched meals:', rows); // Log the fetched data
                    resolve(rows); // Resolve with the data
                }
            });
        });

        // Combine the data (group meals by EntryID)
        const combinedData = journalEntries.map((entry) => ({
            ...entry,
            meals: meals.filter((meal) => meal.EntryID === entry.EntryID),
        }));

        // Log combined data for debugging
        console.log('Combined Data:', JSON.stringify(combinedData, null, 2));

        // Send the combined data as JSON
        res.json(combinedData);
    } catch (error) {
        console.error('Error in /combine route:', error.message);
        res.status(500).json({ error: 'Error fetching data', details: error.message });
    }
});

module.exports = router;
