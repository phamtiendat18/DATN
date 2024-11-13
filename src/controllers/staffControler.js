const Staffs = require("../models/staffs");

// Xem thông tin nhân viên
const getStaffById = async (req, res) => {
  try {
    const staff = await Staffs.findOne({ where: { user_id: req.params.id } });
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
        updated_at: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      { where: { user_id: req.params.id } }
    );

    if (updatedStaff[0] === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy nhân viên để cập nhật" });
    }
    res.json({ message: "Cập nhật thông tin thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

module.exports = {
  getStaffById,
  updateStaff,
};
