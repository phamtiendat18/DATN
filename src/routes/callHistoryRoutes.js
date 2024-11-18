const express = require("express");
const router = express.Router();
const callHistoryController = require("../controllers/callHistoryController");

router.post("/end", callHistoryController.addCallHistory);
router.get("/history/call/:id", callHistoryController.getCallHistoryByCallId);
router.get(
  "/history/user/:id",
  callHistoryController.getAllCallHistoryByUserId
);

module.exports = router;
