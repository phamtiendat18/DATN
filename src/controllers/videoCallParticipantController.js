const VideoCallParticipant = require("../models/videoCallParticipant");

const { getIoInstance } = require("../utils/socket");

const joinVideoCall = async (req, res) => {
  const { call_id, user_id } = req.body;

  try {
    // Thêm người tham gia vào cuộc gọi
    await VideoCallParticipant.create({
      call_id,
      user_id,
      status: "joined",
    });

    const io = await getIoInstance();
    // Thông báo cho người tham gia cuộc gọi
    io.to(user_id).emit("video_call_joined", {
      message: `Bạn đã tham gia cuộc gọi video với ID: ${call_id}`,
    });

    res.status(200).json({ message: "User joined the call successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  joinVideoCall,
};
