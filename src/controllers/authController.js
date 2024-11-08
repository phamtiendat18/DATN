const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const register = async (req, res) => {
  const { username, password, roleId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await Users.create({ username, password: hashedPassword, roleId });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await Users.findOne({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Login failed!', message: 'Đăng nhập thất bại', status: 401 });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(500).json({ error: 'Error logging in' });
    }
  };

module.exports = { register, login};