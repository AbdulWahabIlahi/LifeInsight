import React, { useState } from "react";
import axios from "axios";

const AddMeal = () => {
    const [mealTime, setMealTime] = useState("Breakfast");
    const [foodDescription, setFoodDescription] = useState("");
    const [macros, setMacros] = useState("");
    const [micros, setMicros] = useState("");
    const [feelingAfterMeal, setFeelingAfterMeal] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            MealTime: mealTime,
            FoodDescription: foodDescription,
            Macros: macros,
            Micros: micros,
            FeelingAfterMeal: parseInt(feelingAfterMeal),
        };

        try {
            const response = await axios.post("http://localhost:5000/meal", data);
            alert(`Meal added successfully with EntryID: ${response.data.EntryID}`);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Meal Entry</h1>
            <select value={mealTime} onChange={(e) => setMealTime(e.target.value)} required>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>
            <textarea
                placeholder="Food Description"
                value={foodDescription}
                onChange={(e) => setFoodDescription(e.target.value)}
                required
            />
            <textarea
                placeholder="Macros"
                value={macros}
                onChange={(e) => setMacros(e.target.value)}
                required
            />
            <textarea
                placeholder="Micros"
                value={micros}
                onChange={(e) => setMicros(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Feeling After Meal (1-10)"
                value={feelingAfterMeal}
                onChange={(e) => setFeelingAfterMeal(e.target.value)}
                min="1"
                max="10"
                required
            />
            <button type="submit">Add Meal</button>
        </form>
    );
};

export default AddMeal;
