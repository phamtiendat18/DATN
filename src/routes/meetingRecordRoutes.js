// routes/consultFormRoutes.js
const express = require("express");
const router = express.Router();
const meetingRecordController = require("../controllers/meetingRecordController");

// CRUD routes for consult_forms
router.post("/", meetingRecordController.createForm); // Tạo mới
router.get("/", meetingRecordController.getAllForm); // Lấy tất cả
router.get("/:id", meetingRecordController.getFormById); // Lấy theo ID
router.get("/patient/:id", meetingRecordController.getFormByPatientId); // Lấy theo ID bệnh nhân
router.get("/staff/:id", meetingRecordController.getFormByStaffId); // Lấy theo ID bệnh nhân
router.put("/:id", meetingRecordController.updateForm); // Cập nhật
router.delete("/:id", meetingRecordController.deleteForm); // Xóa

module.exports = router;
