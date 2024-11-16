const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VideoCall = sequelize.define(
  "video_call",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    call_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    scheduled_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Bật timestamps tự động của Sequelize
    underscored: true, // Sử dụng kiểu snake_case cho tên cột
  }
);

module.exports = VideoCall;
