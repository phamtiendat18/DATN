const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/p/register", register);
router.post("/p/login", login);
router.post("/a/login", login);
router.post("/s/register", register);
router.post("/s/login", login);
router.get("/test", (req, res) => {
  return res.status(200).json({ message: "test" });
});

module.exports = router;
