const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecordController");

router.get("/", medicalRecordController.getAllRecords); // Lấy tất cả hồ sơ bệnh
router.get("/:id", medicalRecordController.getRecordById); // Lấy chi tiết hồ sơ bệnh
router.get("/staff/:id", medicalRecordController.getRecordStaffId); // Lấy danh sách hồ sơ bệnh án bác sĩ phụ trách
router.get("/patient/:id", medicalRecordController.getRecordPatientId); // Lấy danh sách hồ sơ bệnh án của bệnh nhân
router.post("/create", medicalRecordController.createRecord); // Tạo hồ sơ bệnh mới
router.put("/:id", medicalRecordController.updateRecord); // Cập nhật hồ sơ bệnh
router.delete("/:id", medicalRecordController.deleteRecord); // Xóa hồ sơ bệnh

module.exports = router;
