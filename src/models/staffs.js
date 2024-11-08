const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Staffs = sequelize.define('staffs', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: DataTypes.BOOLEAN,
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  researchWork: DataTypes.STRING,
  work_place: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  about_me: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
    timestamps: true, // Bật timestamps tự động của Sequelize
    underscored: true, // Sử dụng kiểu snake_case cho tên cột
});

module.exports = Staffs;