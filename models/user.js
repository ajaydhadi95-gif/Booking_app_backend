const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Humari db.js file se connection le rahe hain

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer' // customer, admin, etc.
  }
}, {
  timestamps: true // Yeh automatic createdAt aur updatedAt columns bana dega
});

module.exports = User;