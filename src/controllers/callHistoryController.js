const CallHistory = require("../models/callHistory");
const CallParticipant = require("../models/callParticipant");
const Users = require("../models/users");

Users.hasMany(CallParticipant, { foreignKey: "id" });
CallParticipant.belongsTo(Users, { foreignKey: "user_id" });

const addCallHistory = async (req, res) => {
  const { callId, participants, startTime, endTime, status } = req.body;

  try {
    // Lưu thông tin cuộc gọi chính
    const duration = (endTime - startTime) / 1000;
    await CallHistory.create({
      call_id: callId,
      start_time: new Date(startTime),
      end_time: new Date(endTime),
      duration: duration,
      status: status,
    });

    // Lưu thông tin người tham gia
    const participantData = participants.map((p) => ({
      call_id: callId,
      user_id: p.userId,
      role: p.role,
      joined_at: new Date(p.joinedAt),
      left_at: new Date(p.leftAt),
    }));
    await CallParticipant.bulkCreate(participantData);

    res.status(200).send("Call history and participants saved");
  } catch (error) {
    console.error("Error saving call history and participants:", error);
    res.status(500).send("Failed to save call history and participants");
  }
};

const getCallHistoryByCallId = async (req, res) => {
  try {
    const id = req.params.id;
    const call = await CallHistory.findOne({
      where: { call_id: id },
      include: [
        {
          model: CallParticipant,
          include: [{ model: Users, attributes: ["username"] }],
        },
      ],
    });

    if (!call) {
      return res.status(404).send("Call not found");
    }

    res.status(200).json(call);
  } catch (error) {
    console.error("Error fetching call history:", error);
    res.status(500).send("Failed to fetch call history");
  }
};
const getAllCallHistoryByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const call = await CallHistory.findAll({
      include: [
        {
          model: CallParticipant,
          where: { user_id: userId },
        },
      ],
    });

    if (!call) {
      return res.status(404).send("Call not found");
    }

    res.status(200).json(call);
  } catch (error) {
    console.error("Error fetching call history:", error);
    res.status(500).send("Failed to fetch call history");
  }
};

module.exports = {
  addCallHistory,
  getCallHistoryByCallId,
  getAllCallHistoryByUserId,
};
