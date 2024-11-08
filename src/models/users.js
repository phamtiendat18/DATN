const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  disable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true, // Bật timestamps tự động của Sequelize
  underscored: true, // Sử dụng kiểu snake_case cho tên cột
});

module.exports = Users;