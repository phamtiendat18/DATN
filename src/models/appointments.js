const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Appointments = sequelize.define(
  "appointments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    scheduled_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Tự động thêm created_at và updated_at,
    underscored: true, // Sử dụng snake_case cho tên cột
  }
);

module.exports = Appointments;
