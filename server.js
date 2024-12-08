const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const userRoutes = require("./src/routes/userRoutes");
const patientRoutes = require("./src/routes/patientRoutes");
const staffRoutes = require("./src/routes/staffRoutes");
const departmentRoutes = require("./src/routes/departmentRoutes");
const typeAppointmentRoutes = require("./src/routes/typeAppointmentRoutes");
const typeFormRoutes = require("./src/routes/typeFormRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const callHistoryRoutes = require("./src/routes/callHistoryRoutes");
const medicalRecordRoutes = require("./src/routes/medicalRecordRoutes");
const consultFormRoutes = require("./src/routes/consultFormRoutes");
const requestFomRoutes = require("./src/routes/requestFormRoutes");
const createAdmin = require("./src/utils/createAdmin");
dotenv.config();

const app = express();
const server = http.Server(app);
const PORT = process.env.SERVER_PORT || 4000;
app.use(cors());
app.use(express.json());

// Định nghĩa route cho Auth
app.use("/auth", authRoutes);
app.use("/role", roleRoutes);
app.use("/user", userRoutes);
app.use("/patient", patientRoutes);
app.use("/staff", staffRoutes);
app.use("/department", departmentRoutes);
app.use("/type-appointment", typeAppointmentRoutes);
app.use("/type-form", typeFormRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/call-history", callHistoryRoutes);
app.use("/medical-record", medicalRecordRoutes);
app.use("/consult-form", consultFormRoutes);
app.use("/request-form", requestFomRoutes);
app.get("/", (req, res) => {
  return res.send("<h1>Hello world !!!</h1>");
});

// Kết nối cơ sở dữ liệu và khởi động server
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }).catch(err => console.log('Error syncing database:', err));
// createAdmin();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
