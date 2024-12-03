// controllers/consultFormController.js

const consultForms = require("../models/consultForms");

exports.createConsultForm = async (req, res) => {
  try {
    const { appointment_id, staff_id, code, meeting_info } = req.body;
    const consultForm = await consultForms.create({
      appointment_id,
      staff_id,
      code,
      meeting_info,
    });
    return res.status(201).json({
      data: consultForm,
      message: "Tạo phiếu tư vấn khám chữa bệnh thành công",
      status: 201,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getConsultForms = async (req, res) => {
  try {
    const consultForms = await consultForms.findAll();
    return res.status(200).json(consultForms);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getConsultFormById = async (req, res) => {
  try {
    const consultForm = await consultForms.findByPk(req.params.id);
    if (!consultForm) {
      return res
        .status(200)
        .json({ message: "Consult form not found", status: 404 });
    }
    return res.status(200).json({ data: consultForm, status: 200 });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateConsultForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointment_id, staff_id, code, meeting_info } = req.body;
    const consultForm = await consultForms.findByPk(id);
    if (!consultForm) {
      return res
        .status(200)
        .json({ message: "Consult form not found", status: 404 });
    }

    await consultForm.update({
      appointment_id,
      staff_id,
      code,
      meeting_info,
    });

    return res
      .status(200)
      .json({ message: "Cập nhật thành công", status: 200 });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteConsultForm = async (req, res) => {
  try {
    const { id } = req.params;
    const consultForm = await consultForms.findByPk(id);
    if (!consultForm) {
      return res
        .status(200)
        .json({ message: "Consult form not found", status: 404 });
    }

    await consultForm.destroy();
    return res
      .status(200)
      .json({ message: "Xóa phiếu tư vấn khám chữa bệnh thành công" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
