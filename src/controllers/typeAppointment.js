const TypeAppointments = require("../models/typeAppointments");

// Tạo mới một loại cuộc hẹn
const createTypeAppointment = async (req, res) => {
  try {
    const { name } = req.body;
    const newType = await TypeAppointments.create({ name });
    res
      .status(201)
      .json({ message: "Tạo loại cuộc hẹn thành công", data: newType });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo loại cuộc hẹn", error: error.message });
  }
};

// Lấy danh sách tất cả các loại cuộc hẹn
const getAllTypeAppointments = async (req, res) => {
  try {
    const types = await TypeAppointments.findAll();
    res.json({ data: types });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách loại cuộc hẹn",
      error: error.message,
    });
  }
};

// Lấy thông tin chi tiết một loại cuộc hẹn
const getTypeAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await TypeAppointments.findByPk(id);
    if (!type) {
      return res.status(404).json({ message: "Không tìm thấy loại cuộc hẹn" });
    }
    res.json({ data: type });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy loại cuộc hẹn", error: error.message });
  }
};

// Cập nhật một loại cuộc hẹn
const updateTypeAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedType = await TypeAppointments.update(
      { name },
      { where: { id } }
    );

    if (updatedType[0] === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy loại cuộc hẹn để cập nhật" });
    }
    res.json({ message: "Cập nhật loại cuộc hẹn thành công" });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật loại cuộc hẹn",
      error: error.message,
    });
  }
};

// Xóa một loại cuộc hẹn
const deleteTypeAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TypeAppointments.destroy({ where: { id } });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy loại cuộc hẹn để xóa" });
    }
    res.json({ message: "Xóa loại cuộc hẹn thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa loại cuộc hẹn", error: error.message });
  }
};

module.exports = {
  createTypeAppointment,
  getAllTypeAppointments,
  getTypeAppointmentById,
  updateTypeAppointment,
  deleteTypeAppointment,
};
