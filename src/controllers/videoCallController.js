const VideoCall = require("../models/videoCall");
const VideoCallParticipant = require("../models/videoCallParticipant");
const { getIoInstance } = require("../utils/socket");
// Tạo cuộc gọi video
const startVideoCall = async (req, res) => {
  const { caller_id, participants, call_type } = req.body;

  try {
    // Tạo cuộc gọi
    const videoCall = await VideoCall.create({
      caller_id,
      call_type,
      scheduled_time: new Date(),
    });

    // Thêm người tham gia cuộc gọi
    participants.push(caller_id); // Thêm người gọi vào danh sách người tham gia
    for (let user_id of participants) {
      await VideoCallParticipant.create({
        call_id: videoCall.id,
        user_id,
        status: "joined",
      });
      const io = await getIoInstance();
      io.to(user_id).emit("video_call_invite", {
        message: `Bạn đã được mời tham gia cuộc gọi video với ID: ${videoCall.id}`,
        call_id: videoCall.id,
        caller_id: caller_id,
      });
    }

    res
      .status(200)
      .json({ message: "Call started successfully", call_id: videoCall.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kết thúc cuộc gọi
const endVideoCall = async (req, res) => {
  const { call_id } = req.body;

  try {
    await VideoCall.update({ status: "ended" }, { where: { id: call_id } });
    await VideoCallParticipant.update(
      { left_at: new Date(), status: "left" },
      { where: { call_id } }
    );

    // Thông báo kết thúc cuộc gọi đến tất cả người tham gia
    io.emit("video_call_ended", {
      message: `Cuộc gọi với ID: ${call_id} đã kết thúc.`,
    });

    res.status(200).json({ message: "Call ended successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { startVideoCall, endVideoCall };
