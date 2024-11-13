const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TypeAppointments = sequelize.define(
  "type_appointments",
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Tự động thêm created_at và updated_at
    underscored: true, // Sử dụng snake_case cho tên cột
  }
);

module.exports = TypeAppointments;
