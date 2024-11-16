const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const VideoCall = require("./videoCall");

const VideoCallParticipant = sequelize.define(
  "video_call_participant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    call_id: {
      type: DataTypes.INTEGER,
      references: {
        model: VideoCall,
        key: "id",
      },
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "joined",
    },
    joined_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    left_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Bật timestamps tự động của Sequelize
    underscored: true, // Sử dụng kiểu snake_case cho tên cột
  }
);

module.exports = VideoCallParticipant;
