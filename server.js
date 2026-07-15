require('dotenv').config(); // Sabse pehli line
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db'); // Naya SQLite connection import

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));

// Test Route
app.get('/', (req, res) => {
    res.send('Backend Server is Running!');
});

// Database se connect karne ke baad hi server ko active karein
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to start server due to database error:", err);
});