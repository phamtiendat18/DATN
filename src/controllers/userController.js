const { Op } = require("sequelize");
const Users = require("../models/users");

const assignAccount = async (req, res) => {
  const { id, disable } = req.body;
  try {
    const user = await Users.update(
      { disable: !disable },
      { where: { id: id } }
    );
    res.status(200).json({
      message: disable
        ? "Mở khóa tài khoản thành công"
        : "Khóa tài khoản thành công",
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};
const getAllUser = async (req, res) => {
  try {
    const data = await Users.findAll({
      where: {
        username: { [Op.ne]: "admin" },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy dữ liệu", error });
  }
};
const addUser = async (req, res) => {
  try {
    const { username, password, roleId } = req.body;
    const checkAccount = await Users.findOne({ where: { username } });
    if (!checkAccount && username && password && roleId) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Users.create({
        username,
        password: hashedPassword,
        role_id: roleId,
      });
      res.status(201).json({ user, message: "Thêm người dùng thành công" });
    }
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thêm người dùng mới" });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }
    const { username, status, disable, roleId: role_id } = req.body;
    const userUpdated = new Users.update(
      { username, status, disable, role_id },
      { where: { id: id } }
    );
    res.status(200).json({ user, message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật thông tin người dùng" });
  }
};
const destroyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }

    await Users.destroy({ where: { id: id } });
    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa người dùng" });
  }
};
module.exports = {
  assignAccount,
  getAllUser,
  addUser,
  updateUser,
  destroyUser,
};
