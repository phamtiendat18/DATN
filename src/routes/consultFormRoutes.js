// routes/consultFormRoutes.js
const express = require("express");
const router = express.Router();
const consultFormController = require("../controllers/consultFormController");

// CRUD routes for consult_forms
router.post("/", consultFormController.createConsultForm); // Tạo mới
router.get("/", consultFormController.getConsultForms); // Lấy tất cả
router.get("/:id", consultFormController.getConsultFormById); // Lấy theo ID
router.put("/:id", consultFormController.updateConsultForm); // Cập nhật
router.delete("/:id", consultFormController.deleteConsultForm); // Xóa

module.exports = router;
