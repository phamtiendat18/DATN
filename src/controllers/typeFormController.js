const TypeForms = require("../models/typeForms");

// Tạo mới một loại form
const createTypeForm = async (req, res) => {
  try {
    const { name } = req.body;
    const newType = await TypeForms.create({ name });
    res
      .status(201)
      .json({ message: "Tạo loại form thành công", data: newType });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo loại form", error: error.message });
  }
};

// Lấy danh sách tất cả các loại form
const getAllTypeForms = async (req, res) => {
  try {
    const types = await TypeForms.findAll({order: [['id', 'DESC']]});
    res.json({ data: types });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách loại form",
      error: error.message,
    });
  }
};

// Lấy thông tin chi tiết một loại form
const getTypeFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await TypeForms.findByPk(id);
    if (!type) {
      return res.status(404).json({ message: "Không tìm thấy loại form" });
    }
    res.json({ data: type });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy loại form", error: error.message });
  }
};

// Cập nhật một loại form
const updateTypeForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedType = await TypeForms.update({ name }, { where: { id } });

    if (updatedType[0] === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy loại form để cập nhật" });
    }
    res.json({ message: "Cập nhật loại form thành công" });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật loại form",
      error: error.message,
    });
  }
};

// Xóa một loại form
const deleteTypeForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TypeForms.destroy({ where: { id } });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy loại form để xóa" });
    }
    res.json({ message: "Xóa loại form thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa loại form", error: error.message });
  }
};

module.exports = {
  createTypeForm,
  getAllTypeForms,
  getTypeFormById,
  updateTypeForm,
  deleteTypeForm,
};
