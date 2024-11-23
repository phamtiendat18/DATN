const Appointment = require("../models/appointments");
const Patients = require("../models/patients");
const Staffs = require("../models/staffs");
const TypeAppointments = require("../models/typeAppointments");

TypeAppointments.hasOne(Appointment, { foreignKey: "type_id" });
Appointment.belongsTo(TypeAppointments, { foreignKey: "type_id" });
Appointment.belongsTo(Staffs, { foreignKey: "staff_id" });
Appointment.belongsTo(Patients, { foreignKey: "patient_id" });
// Tạo mới một cuộc hẹn
const createAppointment = async (req, res) => {
  try {
    const { patient_id, scheduled_time, staff_id, status, type_id } = req.body;

    // Kiểm tra nếu thiếu trường bắt buộc
    if (!patient_id || !scheduled_time || !staff_id || !type_id) {
      return res.status(200).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const newAppointment = await Appointment.create({
      patient_id,
      scheduled_time,
      staff_id,
      status: status,
      type_id,
    });

    res
      .status(201)
      .json({ message: "Tạo cuộc hẹn thành công", data: newAppointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo cuộc hẹn", error: error.message });
  }
};

// Lấy danh sách tất cả các cuộc hẹn
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json({ data: appointments });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách cuộc hẹn",
      error: error.message,
    });
  }
};

// Lấy thông tin chi tiết một cuộc hẹn
const getAppointmentByStaffId = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findAll({
      where: { staff_id: id },
      include: [
        { model: Patients, attributes: ["name", "user_id"] },
        {
          model: TypeAppointments,
          attributes: ["name", "id"],
        },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
    }

    res.json({ data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy cuộc hẹn", error: error.message });
  }
};
const getAppointmentByIdPatientId = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findAll({
      where: { patient_id: id },
      include: [
        {
          model: Staffs,
          attributes: ["name", "user_id"],
        },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
    }

    res.json({ data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy cuộc hẹn", error: error.message });
  }
};
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
    }

    res.json({ data: appointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy cuộc hẹn", error: error.message });
  }
};

// Cập nhật một cuộc hẹn
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_id, scheduled_time, staff_id, status, type_id } = req.body;

    const updated = await Appointment.update(
      { patient_id, scheduled_time, staff_id, status, type_id },
      { where: { id } }
    );

    if (updated[0] === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy cuộc hẹn để cập nhật" });
    }

    res.json({ message: "Cập nhật cuộc hẹn thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật cuộc hẹn", error: error.message });
  }
};

// Xóa một cuộc hẹn
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.destroy({ where: { id } });

    if (deleted === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy cuộc hẹn để xóa" });
    }

    res.json({ message: "Xóa cuộc hẹn thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa cuộc hẹn", error: error.message });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentByIdPatientId,
  getAppointmentByStaffId,
  updateAppointment,
  deleteAppointment,
};
