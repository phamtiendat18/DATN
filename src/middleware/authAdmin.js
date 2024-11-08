const Users = require('../models/users');
const Roles = require('../models/roles');

const isAdmin = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.user.id, { include: Roles });
    if (user && user.Roles.name === 'Admin') {
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = isAdmin;