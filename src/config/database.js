const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres", // Đảm bảo rằng bạn đặt đúng loại cơ sở dữ liệu
  protocol: "postgres", // Đặt giao thức nếu cần, ví dụ 'postgres' hoặc 'mysql'
});

module.exports = sequelize;
