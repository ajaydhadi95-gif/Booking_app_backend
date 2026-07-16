const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 1. REGISTER ROUTE (Sign up)
router.post('/register', async (req, res) => {
  try {
    // Frontend se 'username' aa raha hai, use destruct karein
    const { username, email, password } = req.body;

    // Check karein ki user pehle se register toh nahi hai
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered!' });
    }

    // Naya user database mein save karein (username ko name column mein map kiya)
    const newUser = await User.create({ 
      name: username, 
      email, 
      password 
    });
    
    res.status(201).json({ 
      message: 'User registered successfully!', 
      user: { id: newUser.id, name: newUser.name, email: newUser.email } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password!' });
    }

    // Password check karein
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid Email or Password!' });
    }

    res.status(200).json({ 
      message: 'Login successful!', 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;