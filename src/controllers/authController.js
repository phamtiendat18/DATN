const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const Roles = require("../models/roles");

const register = async (req, res) => {
  const { username, password, roleId } = req.body;
  try {
    const role = await Roles.findByPk(roleId);
    const roleName = role?.dataValues?.name;
    console.log(roleName);
    const checkUsername =
      (await Users.findOne({
        where: {
          username: username,
        },
      })) || roleName.toLowerCase() === "admin";
    console.log(checkUsername);

    if (checkUsername) {
      return res.status(400).json({ message: "Tài khoản đã được sử dụng!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const disable = roleName.toLowerCase() === "staffs";
    const user = await Users.create({
      username,
      password: hashedPassword,
      role_id: roleId,
      disable: disable,
    });
    console.log(user);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ data: user, token, status: 201 });
  } catch (err) {
    res.status(400).json({ error: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        error: "Login failed!",
        message: "Đăng nhập thất bại",
        status: "FAIL",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ user, token, status: "OK" });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = { register, login };
