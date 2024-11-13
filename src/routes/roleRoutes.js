const express = require("express");
const {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
  assignRole,
} = require("../controllers/roleController");
const isAdmin = require("../middleware/authAdmin"); // Middleware kiểm tra quyền Admin
const router = express.Router();

router.post("/create", createRole); // Tạo role mới
router.get("/", getRoles); // Lấy danh sách roles
router.put("/:id", isAdmin, updateRole); // Cập nhật role
router.delete("/:id", isAdmin, deleteRole); // Xóa role

module.exports = router;
