const express = require('express');
const router = express.Router();
const booking = require('../models/Booking');
const User = require('../models/User');

// 1. CREATE BOOKING (Nayi booking banana)
router.post('/create', async (req, res) => {
  try {
    const { userId, itemName, bookingDate } = req.body;

    // Check karein ki user exist karta hai ya nahi
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const newbooking = await booking.create({
      userId,
      itemName,
      bookingDate
    });

    res.status(201).json({ message: 'Booking created successfully!', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 2. GET USER BOOKINGS (Kisi specific user ki saari bookings dekhna)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.findAll({
      where: { userId },
      include: [{ model: User, attributes: ['name', 'email'] }] // User details bhi sath mein milengi
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;