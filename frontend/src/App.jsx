import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [entryDate, setEntryDate] = useState('');
    const [mood, setMood] = useState('');
    const [sleepScore, setSleepScore] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { entryDate, mood: parseInt(mood), sleepScore: parseInt(sleepScore) };

        try {
            const response = await axios.post('http://localhost:5000/journal', data);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error adding entry:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>Journal Entry</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Mood (1-10):</label>
                    <input
                        type="number"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                    />
                </div>
                <div>
                    <label>Sleep Score (1-10):</label>
                    <input
                        type="number"
                        value={sleepScore}
                        onChange={(e) => setSleepScore(e.target.value)}
                    />
                </div>
                <button type="submit">Add Entry</button>
            </form>
        </div>
    );
};

export default App;
