// models/consultForm.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ConsultForm = sequelize.define(
  "consult_forms",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    meeting_info: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "consult_forms",
    timestamps: true,
  }
);

module.exports = ConsultForm;
