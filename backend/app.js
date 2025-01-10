const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const journalRoutes = require('./routes/journalRoutes');
const mealRoutes = require('./routes/mealRoutes');
const dashboard = require('./routes/dashboard');
const workoutRoutes = require('./routes/workoutRoutes.js');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/journal', journalRoutes);
app.use('/meal', mealRoutes);
app.use('workout', workoutRoutes)
app.use('/', dashboard)

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


