const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const Roles = require("../models/roles");
const Staffs = require("../models/staffs");
const Patients = require("../models/patients");

const register = async (req, res) => {
  const { username, password, roleId } = req.body;
  try {
    const role = await Roles.findByPk(roleId);
    const roleName = role?.dataValues?.name;
    const checkUsername =
      (await Users.findOne({
        where: {
          username: username,
        },
      })) || roleName.toLowerCase() === "admin";
    console.log(checkUsername);

    if (checkUsername) {
      return res
        .status(400)
        .json({ message: "Tài khoản đã được sử dụng!", status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const disable = roleName.toLowerCase() === "staffs";
    const user = await Users.create({
      username,
      password: hashedPassword,
      role_id: roleId,
      disable: disable,
    });
    console.log(disable, user?.dataValues?.id);

    disable
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
    res.status(201).json({ data: user, token, status: 201 });
  } catch (err) {
    res.status(400).json({ error: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username } });
    if (!user)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    const role = await Roles.findByPk(user?.id);
    const check = role?.dataValues?.name.toLowerCase() === "statffs";
    console.log(user?.id);

    const userInfo = check
      ? await Staffs.findOne({
          where: {
            user_id: user?.id,
          },
        })
      : await Patients.findOne({
          where: {
            user_id: user?.id,
          },
        });
    if (!userInfo) {
      console.log("oke");
    }

    !userInfo && check
      ? await Staffs.create({
          user_id: user?.id,
          name: user?.username,
        })
      : await Patients.create({
          user_id: user?.id,
          name: user?.username,
        });
    console.log("ok");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        error: "Login failed!",
        message: "Đăng nhập thất bại",
        status: 200,
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      data: {
        user_id: userInfo ? userInfo?.user_id : user?.id,
        name: userInfo ? userInfo?.name : user?.username,
        gender: userInfo ? userInfo?.gender : true,
        id_number: userInfo ? userInfo?.id_number : null,
        birthday: userInfo ? userInfo?.birthday : null,
        address: userInfo ? userInfo?.address : null,
        phone_number: userInfo ? userInfo?.phone_number : null,
        insurance_number: userInfo ? userInfo?.insurance_number : null,
      },
      token,
      status: 200,
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging in", err });
  }
};

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
      status: 200,
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
};

module.exports = { register, login, assignAccount };