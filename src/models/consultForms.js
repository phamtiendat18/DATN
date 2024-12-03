// models/consultForm.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ConsultForm = sequelize.define(
  "ConsultForm",
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
    created_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "consult_forms",
    timestamps: true,
  }
);

module.exports = ConsultForm;
