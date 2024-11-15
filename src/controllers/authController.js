const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const Roles = require("../models/roles");
const Staffs = require("../models/staffs");
const Patients = require("../models/patients");
const { where } = require("sequelize");
Users.belongsTo(Roles, { foreignKey: "role_id" });
Users.hasOne(Staffs, { foreignKey: "user_id" });
Users.hasOne(Patients, { foreignKey: "user_id" });

const register = async (req, res) => {
  const { username, password, role_id } = req.body;
  try {
    const role = await Roles.findOne({ where: { id: role_id } });
    const roleName = role?.name;
    const checkUsername =
      (await Users.findOne({
        where: {
          username: username,
        },
      })) || roleName.toLowerCase() === "admin";
    if (checkUsername) {
      return res
        .status(200)
        .json({ message: "Tài khoản đã được sử dụng!", status: 401 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const disable = roleName.toLowerCase() === "staffs";
    const user = await Users.create({
      username,
      password: hashedPassword,
      role_id: role_id,
      disable: disable,
    });
    console.log(disable, user?.dataValues?.id);

    const data = disable
      ? await Staffs.create({
          user_id: user?.dataValues?.id,
          name: user?.dataValues?.username,
        })
      : await Patients.create({
          user_id: user?.dataValues?.id,
          name: user?.dataValues?.username,
        });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user)
      return res
        .status(200)
        .json({ message: "Tài khoản không tồn tại", status: 401 });
    if (user?.dataValues?.disable)
      return res.status(200).json({
        message: "Tài khoản này hiện tại không thể sử dụng",
        status: 401,
      });
    const role = await Roles.findOne({
      where: { id: user?.dataValues?.role_id },
    });
    const check = role?.dataValues?.name.toLowerCase().trim() === "staffs";
    console.log(check);

    const userInfo = await Users.findOne({
      include: [
        {
          model: Roles,
          required: false,
          attributes: { exclude: ["id"] },
        },
        {
          model: check ? Staffs : Patients,
          required: false,
        },
      ],
      where: {
        username: username,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        status: 401,
        message: "Đăng nhập thất bại",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ data: userInfo, token });
  } catch (err) {
    res.status(500).json({ error: "Error logging in", err });
  }
};
const changePassword = async (req, res) => {
  try {
    const { username, old_password, password } = req.body;
    const id = req.params.id;
    const userInfo = await Users.findOne({ where: { username: username } });

    if (!userInfo) {
      return res.status(200).json({ message: "User not found", status: 401 });
    }

    const check = await bcrypt.compare(
      old_password,
      userInfo?.dataValues?.password
    );

    if (check) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [updated] = await Users.update(
        { password: hashedPassword },
        { where: { username: username } }
      );

      console.log(updated);

      if (updated) {
        res.status(200).json({ message: "Thay đổi mật khẩu thành công" });
      } else {
        res
          .status(200)
          .json({ message: "Thay đổi mật khẩu thất bại", status: 401 });
      }
    } else {
      res
        .status(200)
        .json({ message: "Mật khẩu cũ không chính xác", status: 401 });
    }
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Error change password", err });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Đăng xuất thành công.",
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = { register, login, logout, changePassword };
