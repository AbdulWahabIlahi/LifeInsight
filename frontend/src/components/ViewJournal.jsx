import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewJournal = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/journal');
                setEntries(response.data);
                console.log(entries)
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Journal Entries</h1>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        Date: {entry.EntryDate},DreamNotes: {entry.DreamNotes}, HungerLevel: {entry.HungerLevel},MorningMood: {entry.MorningMood}, Sleep: {entry.sleepScore}, Todolist: {entry.ToDoList}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewJournal;
