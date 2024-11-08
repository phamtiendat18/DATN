const jwt = require('jsonwebtoken');

// Hàm tạo token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      roleId: user.roleId,
    },
    process.env.JWT_SECRET, // Mật khẩu bí mật được lưu trong biến môi trường
    {
      expiresIn: '7d', // Thời gian hết hạn token
    }
  );
};

module.exports = generateToken;