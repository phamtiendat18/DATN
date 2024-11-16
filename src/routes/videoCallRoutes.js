const express = require("express");
const router = express.Router();
const videoCallController = require("../controllers/videoCallController");
const videoCallParticipantController = require("../controllers/videoCallParticipantController");

router.post("/start", videoCallController.startVideoCall);
router.post("/end", videoCallController.endVideoCall);
router.post("/join", videoCallParticipantController.joinVideoCall);

module.exports = router;
