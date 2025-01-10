import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddJournal from './components/AddJournal';
import ViewJournal from './components/ViewJournal';
import AddMeal from './components/AddMeal';
import ViewMeal from './components/ViewMeal';
import AddWorkout from './components/AddWorkout';
import ViewWorkout from './components/ViewWorkout';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AddJournal />} />
                <Route path="/view" element={<ViewJournal />} />
                <Route path="/meal" element={<AddMeal />} />
                <Route path="/mealview" element={<ViewMeal />} />
                <Route path="/workout" element={<AddWorkout />} />
                <Route path="/workoutview" element={<ViewWorkout />} />
            </Routes>
        </Router>
    );
};

export default App;
