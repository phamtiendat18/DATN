const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TypeForms = sequelize.define(
  "type_forms",
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

module.exports = TypeForms;
