const express = require("express");
const {
  register,
  login,
  logout,
  changePassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/change-password", changePassword);

module.exports = router;
