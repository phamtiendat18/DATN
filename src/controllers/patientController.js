const Patients = require("../models/patients");

// Xem thông tin bệnh nhân
const getPatientById = async (req, res) => {
  try {
    const user_id = req.params?.id;
    const patient = await Patients.findOne({ where: { user_id: user_id } });
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
    const user_id = req.params.id;
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
      { where: { user_id: user_id } }
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
};