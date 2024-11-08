const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patients = sequelize.define('patients', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: DataTypes.BOOLEAN,
  CCCD: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  insurance_number: DataTypes.STRING
},
{
    timestamps: true, // Bật timestamps tự động của Sequelize
    underscored: true, // Sử dụng kiểu snake_case cho tên cột
});

module.exports = Patients;