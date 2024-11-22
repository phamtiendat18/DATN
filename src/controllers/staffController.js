const MedicalRecords = require("../models/medicalRecords");
const Staffs = require("../models/staffs");

Staffs.hasMany(MedicalRecords, { foreignKey: "staff_id" });

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
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
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
      department,
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
        department,
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
};
