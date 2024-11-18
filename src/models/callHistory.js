const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CallHistory = sequelize.define("CallHistory", {
  call_id: { type: DataTypes.STRING, allowNull: false },
  start_time: { type: DataTypes.DATE, allowNull: false },
  end_time: { type: DataTypes.DATE },
  duration: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING },
});
module.exports = CallHistory;
