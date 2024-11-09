const express = require("express");
const {
  register,
  login,
  assignAccount,
} = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/assign", assignAccount);

module.exports = router;
