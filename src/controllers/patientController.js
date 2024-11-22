const MedicalRecords = require("../models/medicalRecords");
const Patients = require("../models/patients");
Patients.hasMany(MedicalRecords, { foreignKey: "patient_id" });

const getAllPatient = async (req, res) => {
  try {
    const patient = await Patients.findAll();
    if (!patient) {
      return res.status(404).json({ message: "Không tìm thấy bệnh nhân" });
    }
    res.json({ data: patient, message: "Lấy danh sách thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};
// Xem thông tin bệnh nhân
const getPatientById = async (req, res) => {
  try {
    const id = req.params?.id;
    const patient = await Patients.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: "Không tìm thấy bệnh nhân" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// Sửa thông tin bệnh nhân
const updatePatient = async (req, res) => {
  try {
    const {
      name,
      gender,
      id_number,
      birthday,
      address,
      phone_number,
      insurance_number,
    } = req.body;
    const id = req.params.id;
    const updatedPatient = await Patients.update(
      {
        name,
        gender,
        id_number,
        birthday,
        address,
        phone_number,
        insurance_number,
        updated_at: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      { where: { id: id } }
    );

    if (updatedPatient[0] === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bệnh nhân để cập nhật" });
    }
    res.json({ message: "Cập nhật thông tin thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

module.exports = {
  getPatientById,
  updatePatient,
  getAllPatient,
};
