const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false 
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite Database connected successfully!');
    
    // Yahan humne User model ko import kiya taaki table ban sake
    require('./models/User'); 

    require('./models/User'); 
    require('./models/Booking'); // Ye line add karein
    
    await sequelize.sync({ alter: true }); 
    console.log('Database tables synced!');
  } catch (error) {
    console.error('Database Connection Error:', error);
  }
};

module.exports = { sequelize, connectDB };