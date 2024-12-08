// models/consultForm.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MeetingRecord = sequelize.define(
  "meeting_records",
  {
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    request_form_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    meeting_info: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    tableName: "meeting_records",
    timestamps: true,
    underscored: true,
  }
);

module.exports = MeetingRecord;
