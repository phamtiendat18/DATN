const Appointments = require("../models/appointments");
const MedicalRecords = require("../models/medicalRecords");
const Staffs = require("../models/staffs");

Staffs.hasMany(MedicalRecords, { foreignKey: "staff_id" });
Staffs.hasMany(Appointments, { foreignKey: "staff_id" });

// Xem thông tin nhân viên
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staffs.findAll();
    if (!staff) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    }
    res.json({ data: staff, message: "Lấy danh sách thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};
// Xem thông tin nhân viên
const getStaffById = async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await Staffs.findByPk(id);
    if (!staff) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// Lấy danh sách bác sĩ thuộc khoa

const getAllStaffByDepartmentId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Staffs.findAll({ where: { department_id: id } });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving roles" });
  }
};

// Sửa thông tin nhân viên
const updateStaff = async (req, res) => {
  try {
    const {
      name,
      gender,
      birthday,
      address,
      position,
      department_id,
      phone_number,
      research_work,
      work_place,
      experience,
      about_me,
    } = req.body;
    const id = req.params.id;
    const updatedStaff = await Staffs.update(
      {
        name,
        gender,
        birthday,
        address,
        position,
        department_id,
        phone_number,
        research_work,
        work_place,
        experience,
        about_me,
      },
      { where: { id: id } }
    );

    if (updatedStaff[0] === 0) {
      return res
        .status(200)
        .json({ message: "Không tìm thấy nhân viên để cập nhật", status: 404 });
    }
    res.status(200).json({ message: "Cập nhật thông tin thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

module.exports = {
  getStaffById,
  updateStaff,
  getAllStaff,
  getAllStaffByDepartmentId,
};
