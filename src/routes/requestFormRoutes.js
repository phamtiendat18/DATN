// routes/consultFormRoutes.js
const express = require("express");
const router = express.Router();
const requestFormController = require("../controllers/requestFormController");

// CRUD routes for consult_forms
router.post("/", requestFormController.createForm); // Tạo mới
router.get("/", requestFormController.getAllForm); // Lấy tất cả
router.get("/:id", requestFormController.getFormById); // Lấy theo ID
router.get("/patient/:id", requestFormController.getFormByPatientId); // Lấy theo ID bệnh nhân
router.get("/staff/:id", requestFormController.getFormByStaffId); // Lấy theo ID bệnh nhân
router.put("/:id", requestFormController.updateForm); // Cập nhật
router.delete("/:id", requestFormController.deleteForm); // Xóa

module.exports = router;
