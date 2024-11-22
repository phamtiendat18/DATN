const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecordController");

router.get("/", medicalRecordController.getAllRecords); // Lấy tất cả hồ sơ bệnh
router.get("/:id", medicalRecordController.getRecordById); // Lấy chi tiết hồ sơ bệnh
router.post("/create", medicalRecordController.createRecord); // Tạo hồ sơ bệnh mới
router.put("/:id", medicalRecordController.updateRecord); // Cập nhật hồ sơ bệnh
router.delete("/:id", medicalRecordController.deleteRecord); // Xóa hồ sơ bệnh

module.exports = router;
