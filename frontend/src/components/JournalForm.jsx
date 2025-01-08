import React, { useState, useEffect } from "react";
import axios from "axios";

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    entryDate: "",
    toDoList: "",
    morningMood: 5,
    sleepScore: 5,
    dreamNotes: "",
    hungerLevel: 5,
  });

  // Fetch existing journal entries
  useEffect(() => {
    axios.get("http://localhost:5000/journal").then((response) => {
      setEntries(response.data);
    });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit a new journal entry
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/journal", formData).then(() => {
      // Refresh the list
      axios.get("http://localhost:5000/journal").then((response) => {
        setEntries(response.data);
      });
    });
  };

  return (
    <div>
      <h1>Journal Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" name="entryDate" value={formData.entryDate} onChange={handleChange} required />
        <textarea name="toDoList" value={formData.toDoList} onChange={handleChange} placeholder="To-Do List" />
        <input type="number" name="morningMood" value={formData.morningMood} onChange={handleChange} min="1" max="10" />
        <input type="number" name="sleepScore" value={formData.sleepScore} onChange={handleChange} min="1" max="10" />
        <textarea name="dreamNotes" value={formData.dreamNotes} onChange={handleChange} placeholder="Dream Notes" />
        <input type="number" name="hungerLevel" value={formData.hungerLevel} onChange={handleChange} min="1" max="10" />
        <button type="submit">Add Journal Entry</button>
      </form>
      <h2>Entries:</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>{entry.entryDate}: {entry.toDoList}</li>
        ))}
      </ul>
    </div>
  );
};

export default JournalPage;
