const express = require("express");
const router = express.Router();
const typeFormController = require("../controllers/typeFormController");

// Định nghĩa các route và gắn với phương thức của controller
router.get("/", typeFormController.getAllTypeForms);
router.post("/", typeFormController.createTypeForm);
router.put("/:id", typeFormController.updateTypeForm);
router.delete("/:id", typeFormController.deleteTypeForm);

module.exports = router;
