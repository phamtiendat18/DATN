// models/consultForm.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RequestForm = sequelize.define(
  "request_forms",
  {
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    disease_progress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    tableName: "request_forms",
    timestamps: true,
    underscored: true,
  }
);

module.exports = RequestForm;
