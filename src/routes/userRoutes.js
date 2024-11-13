const express = require("express");
const {
  addUser,
  getAllUser,
  destroyUser,
  updateUser,
  assignAccount,
} = require("../controllers/userController");
const isAdmin = require("../middleware/authAdmin"); // Middleware kiểm tra quyền Admin
const router = express.Router();

router.post("/create", addUser); // Tạo role mới
router.get("/", getAllUser); // Lấy danh sách roles
router.put("/:id", updateUser); // Cập nhật role
router.delete("/:id", destroyUser); // Xóa role
router.post("/assign", assignAccount); // Gán role cho user

module.exports = router;
