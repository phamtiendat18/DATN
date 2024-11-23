const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Departments = sequelize.define(
  "departments",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Bật timestamps tự động của Sequelize
    underscored: true, // Sử dụng kiểu snake_case cho tên cột
  }
);

module.exports = Departments;
