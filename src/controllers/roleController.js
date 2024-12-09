const { Op, where } = require("sequelize");
const Roles = require("../models/roles");
const Users = require("../models/users");

// Tạo role mới
const createRole = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(200).json({ error: "Roles name is required" });
  }

  try {
    const checkRoleName = await Roles.findOne({
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
    const role = await Roles.create({ name });
    return res.status(201).json({ data: role, status: 201 });
  } catch (err) {
    res.status(500).json({ error: "Error creating role" });
  }
};

// Lấy danh sách roles
const getRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll({
      where: {
        name: { [Op.ne]: "Admin" },
      },
      order: [['id', 'DESC']]
    });

    res.status(200).json({ data: roles, status: 200 });
  } catch (err) {
    res.status(500).json({ error: "Error retrieving roles" });
  }
};

// Cập nhật role
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(200).json({ message: "Roles name is required" });
  }

  try {
    const role = await Roles.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: "Không tồn tại role này!" });
    }
    const newRole = await Roles.update(
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

// Xóa role
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Roles.destroy({ where: { id: id } });
    if (!role) {
      return res.status(404).json({ error: "Roles not found" });
    }
    res.status(200).json({ message: "Roles deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting role" });
  }
};

module.exports = {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
};
