const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CallParticipant = sequelize.define("CallParticipant", {
  call_id: { type: DataTypes.STRING, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  role: { type: DataTypes.STRING },
  joined_at: { type: DataTypes.DATE },
  left_at: { type: DataTypes.DATE },
});
module.exports = CallParticipant;
