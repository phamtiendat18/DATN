const express = require("express");
const {
  createDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");
const isAdmin = require("../middleware/authAdmin"); // Middleware kiểm tra quyền Admin
const router = express.Router();

router.post("/create", createDepartment); // Tạo role mới
router.get("/", getDepartment); // Lấy danh sách roles
router.put("/:id", isAdmin, updateRole); // Cập nhật role
router.delete("/:id", isAdmin, deleteDepartment); // Xóa role

module.exports = router;
