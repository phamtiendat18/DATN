// controllers/consultFormController.js

const { where } = require("sequelize");
const Appointments = require("../models/appointments");
const ConsultForm = require("../models/consultForms");
const Staffs = require("../models/staffs");
const TypeForms = require("../models/typeForms");

TypeForms.hasOne(ConsultForm, { foreignKey: "type_id" });
ConsultForm.belongsTo(TypeForms, { foreignKey: "type_id" });
ConsultForm.belongsTo(Appointments, { foreignKey: "appointment_id" });
ConsultForm.belongsTo(Staffs, { foreignKey: "staff_id" });
exports.createConsultForm = async (req, res) => {
  try {
    const { appointment_id, staff_id, code, meeting_info, type_id } = req.body;
    const consultForm = await ConsultForm.create({
      appointment_id,
      staff_id,
      code,
      meeting_info,
      type_id,
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
    const consultForms = await ConsultForm.findAll({order: [['id', 'DESC']]});
    return res.status(200).json(consultForms);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getConsultFormById = async (req, res) => {
  try {
    const consultForm = await ConsultForm.findByPk(req.params.id);
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
exports.getConsultFormByPatientId = async (req, res) => {
  try {
    const id = req.params?.id;
    const consultForm = await ConsultForm.findAll({
      where: { patient_id: id },
      include: [{ model: TypeForms, attributes: ["name"] }],
      order: [['id', 'DESC']]
    });
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
exports.getConsultFormByStaffId = async (req, res) => {
  try {
    const id = req.params?.id;
    const consultForm = await ConsultForm.findAll({
      where: { staff_id: id },
      include: [{ model: TypeForms, attributes: ["name"] }],
      order: [['id', 'DESC']]
    });
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
    const { appointment_id, staff_id, code, meeting_info, type_id } = req.body;
    const consultForm = await ConsultForm.findByPk(id);
    if (!consultForm) {
      return res
        .status(200)
        .json({ message: "Consult form not found", status: 404 });
    }

    await ConsultForm.update({
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
    const consultForm = await ConsultForm.findByPk(id);
    if (!consultForm) {
      return res
        .status(200)
        .json({ message: "Consult form not found", status: 404 });
    }

    await ConsultForm.destroy();
    return res
      .status(200)
      .json({ message: "Xóa phiếu tư vấn khám chữa bệnh thành công" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
