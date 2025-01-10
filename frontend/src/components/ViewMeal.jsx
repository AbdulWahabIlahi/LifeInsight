import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealResponse = await axios.get("http://localhost:5000/meals");
        setMeals(mealResponse.data);
      } catch (error) {
        console.error("Error fetching meals:", error.message);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <h1>Meal Entries</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.MealID}>
            <p>Entry ID: {meal.EntryID}</p>
            <p>Meal Time: {meal.MealTime}</p>
            <p>Food Description: {meal.FoodDescription}</p>
            <p>Macros: {meal.Macros}</p>
            <p>Micros: {meal.Micros}</p>
            <p>Feeling After Meal: {meal.FeelingAfterMeal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMeals;
