const MedicalRecords = require("../models/medicalRecords");
const Staffs = require("../models/staffs");
const Patients = require("../models/patients");

MedicalRecords.belongsTo(Staffs, { foreignKey: "staff_id" });
MedicalRecords.belongsTo(Patients, { foreignKey: "patient_id" });
// Lấy tất cả các hồ sơ bệnh
exports.getAllRecords = async (req, res) => {
  try {
    const records = await MedicalRecords.findAll();
    res.status(200).json({ data: records, message: "Lấy hồ sơ thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết hồ sơ bệnh theo ID
exports.getRecordById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await MedicalRecords.findOne({
      include: [
        {
          model: Staffs,
        },
        {
          model: Patients,
        },
      ],
      where: { id: id },
    });
    if (!record) {
      return res.status(200).json({ message: "Record not found", status: 404 });
    }
    res.status(200).json({ data: record, message: "Lấy hồ sơ thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết hồ sơ bệnh theo ID nhân viên y tế
exports.getRecordStaffId = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await MedicalRecords.findOne({
      include: [
        {
          model: Staffs,
          where: { id: id },
        },
        {
          model: Patients,
        },
      ],
    });
    if (!record) {
      return res.status(200).json({ message: "Record not found", status: 404 });
    }
    res.status(200).json({ data: record, message: "Lấy hồ sơ thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết hồ sơ bệnh theo ID
exports.getRecordPatientId = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await MedicalRecords.findAll({
      include: [
        {
          model: Staffs,
        },
        {
          model: Patients,
          where: { id: id },
        },
      ],
    });
    if (!record) {
      return res.status(200).json({ message: "Record not found", status: 404 });
    }
    res.status(200).json({ data: record, message: "Lấy hồ sơ thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo hồ sơ bệnh mới
exports.createRecord = async (req, res) => {
  try {
    const { staff_id, patient_id, disease_history, status } = req.body;
    const newRecord = await MedicalRecords.create({
      staff_id,
      patient_id,
      disease_history,
      status,
    });
    res.status(201).json({ data: newRecord, message: "Tạo hồ sơ thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật hồ sơ bệnh
exports.updateRecord = async (req, res) => {
  try {
    const record = await MedicalRecords.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    await record.update(req.body);
    res.status(200).json({ data: record, message: "Tạo hồ sơ thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa hồ sơ bệnh
exports.deleteRecord = async (req, res) => {
  try {
    const record = await MedicalRecords.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    await record.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
