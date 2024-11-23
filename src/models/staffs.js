const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Staffs = sequelize.define(
  "staffs",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    research_work: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    work_place: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about_me: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Bật timestamps tự động của Sequelize
    underscored: true, // Sử dụng kiểu snake_case cho tên cột
  }
);

module.exports = Staffs;
