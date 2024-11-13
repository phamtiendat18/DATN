const express = require("express");
const router = express.Router();
const typeAppointmentController = require("../controllers/typeAppointment");

// Định nghĩa các route và gắn với phương thức của controller
router.get("/", typeAppointmentController.getAllTypeAppointments);
router.post("/create", typeAppointmentController.createTypeAppointment);
router.put("/:id", typeAppointmentController.updateTypeAppointment);
router.delete("/:id", typeAppointmentController.deleteTypeAppointment);

module.exports = router;
