import React, { useState } from 'react';
import axios from 'axios';

const AddJournal = () => {
    const [entryDate, setEntryDate] = useState('');
    const [ToDoList, setToDoList] = useState('');
    const [MorningMood, setMorningMood] = useState('');
    const [SleepScore, setSleepScore] = useState('');
    const [DreamNotes, setDreamNotes] = useState('');
    const [HungerLevel, setHungerLevel] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            entryDate,
            ToDoList,
            MorningMood: parseInt(MorningMood),
            SleepScore: parseInt(SleepScore),
            DreamNotes,
            HungerLevel: parseInt(HungerLevel),
        };

        try {
            const response = await axios.post('http://localhost:5000/journal', data);
            alert(response.data.message);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Journal Entry</h1>
            <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                required
            />
            <textarea
                placeholder="To-Do List"
                value={ToDoList}
                onChange={(e) => setToDoList(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Morning Mood (1-10)"
                value={MorningMood}
                onChange={(e) => setMorningMood(e.target.value)}
                min="1"
                max="10"
                required
            />
            <input
                type="number"
                placeholder="Sleep Score (1-10)"
                value={SleepScore}
                onChange={(e) => setSleepScore(e.target.value)}
                min="1"
                max="10"
                required
            />
            <textarea
                placeholder="Dream Notes"
                value={DreamNotes}
                onChange={(e) => setDreamNotes(e.target.value)}
            />
            <input
                type="number"
                placeholder="Hunger Level (1-10)"
                value={HungerLevel}
                onChange={(e) => setHungerLevel(e.target.value)}
                min="1"
                max="10"
                required
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddJournal;