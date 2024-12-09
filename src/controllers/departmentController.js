const { Op, where } = require("sequelize");
const Departments = require("../models/departments");
const Users = require("../models/users");

// Tạo role mới
const createDepartment = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(200).json({ error: "Department name is required" });
  }

  try {
    const checkRoleName = await Departments.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });
    console.log(checkRoleName);

    if (checkRoleName) {
      return res
        .status(200)
        .json({ message: "Vai trò đã tồn tại", status: 400 });
    }
    const role = await Departments.create({ name });
    return res.status(201).json({ data: role, status: 201 });
  } catch (err) {
    res.status(500).json({ error: "Error creating role" });
  }
};

// Lấy danh sách roles
const getDepartment = async (req, res) => {
  try {
    const roles = await Departments.findAll({order: [['id', 'DESC']]});

    res.status(200).json({ data: roles, status: 200 });
  } catch (err) {
    res.status(500).json({ error: "Error retrieving roles" });
  }
};

// Cập nhật role
const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(200).json({ message: "Departments name is required" });
  }

  try {
    const role = await Departments.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: "Không tồn tại role này!" });
    }
    const newRole = await Departments.update(
      { name: name, updated_at: new Date() },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ data: newRole, message: "Cập nhật thành công!" });
  } catch (err) {
    res.status(500).json({ error: "Error updating role" });
  }
};

// Xóa khoa
const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Departments.destroy({ where: { id: id } });
    if (!role) {
      return res.status(404).json({ error: "Departments not found" });
    }
    res.status(200).json({ message: "Departments deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting role" });
  }
};

module.exports = {
  createDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
