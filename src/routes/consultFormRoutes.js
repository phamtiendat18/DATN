// routes/consultFormRoutes.js
const express = require("express");
const router = express.Router();
const consultFormController = require("../controllers/consultFormController");

// CRUD routes for consult_forms
router.post("/", consultFormController.createConsultForm); // Tạo mới
router.get("/", consultFormController.getConsultForms); // Lấy tất cả
router.get("/:id", consultFormController.getConsultFormById); // Lấy theo ID
router.get("/patient/:id", consultFormController.getConsultFormByPatientId); // Lấy theo ID bệnh nhân
router.get("/staff/:id", consultFormController.getConsultFormByStaffId); // Lấy theo ID bệnh nhân
router.put("/:id", consultFormController.updateConsultForm); // Cập nhật
router.delete("/:id", consultFormController.deleteConsultForm); // Xóa

module.exports = router;
