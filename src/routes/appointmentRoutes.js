const express = require("express");
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentByIdPatientId,
  getAppointmentByStaffId,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const isAdmin = require("../middleware/authAdmin");
const router = express.Router();

router.post("/create", createAppointment);
router.get("/", getAllAppointments);
router.get("/patient/:id", getAppointmentByIdPatientId);
router.get("/staff/:id", getAppointmentByStaffId);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
