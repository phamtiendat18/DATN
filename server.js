const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

app.use(express.json());

// Định nghĩa route cho Auth
app.use("/auth", authRoutes);
app.use("/role", roleRoutes);

// Kết nối cơ sở dữ liệu và khởi động server
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }).catch(err => console.log('Error syncing database:', err));
createAdmin();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
