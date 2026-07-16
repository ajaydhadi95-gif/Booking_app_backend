const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const User = require('./User'); // User model import kar rahe hain association ke liye

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  itemName: { // Jo cheez book ki ja rahi hai (e.g., Hotel Name, Car, Slot)
    type: DataTypes.STRING,
    allowNull: false
  },
  bookingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Approved' // pending, confirmed, cancelled
  }
}, {
  timestamps: true
});

// Association: Ek Booking hamesha kisi ek User ki hogi
Booking.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Booking, { foreignKey: 'userId' });

module.exports = Booking;