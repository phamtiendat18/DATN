const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Định nghĩa các route và gắn với phương thức của controller
router.get("/", staffController.getAllStaff);
router.get("/:id", staffController.getStaffById);
router.put("/:id", staffController.updateStaff);

module.exports = router;
