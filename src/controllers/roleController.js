const Roles = require("../models/roles");
const Users = require("../models/users");

// Tạo role mới
const createRole = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Roles name is required" });
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
        .status(400)
        .json({ message: "Vai trò đã tồn tại", status: 400 });
    }
    const role = await Roles.create({ name });
    return res.status(201).json({ data: role, status: 201 });
  } catch (err) {
    res.status(400).json({ error: "Error creating role" });
  }
};

// Lấy danh sách roles
const getRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll({
      where: {
        role_name: { [Sequelize.Op.ne]: "Admin" },
      },
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
    return res.status(400).json({ error: "Roles name is required" });
  }

  try {
    const role = await Roles.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: "Roles not found" });
    }
    role.name = name;
    await role.save();
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ error: "Error updating role" });
  }
};

// Xóa role
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Roles.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: "Roles not found" });
    }
    await role.destroy();
    res.status(200).json({ message: "Roles deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting role" });
  }
};

// Gán role cho người dùng
const assignRole = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Users not found" });
    }
    const role = await Roles.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ error: "Roles not found" });
    }

    user.roleId = roleId;
    await user.save();
    res.status(200).json({ message: "Roles assigned successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Error assigning role" });
  }
};

module.exports = {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
  assignRole,
};
