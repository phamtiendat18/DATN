const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientController");

// Định nghĩa các route và gắn với phương thức của controller
router.get("/", patientsController.getAllPatient);
router.get("/:id", patientsController.getPatientById);
router.put("/:id", patientsController.updatePatient);

module.exports = router;
