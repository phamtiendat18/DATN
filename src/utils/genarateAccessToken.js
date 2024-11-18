const jwt = require("jsonwebtoken"); // Thư viện để tạo JWT
require("dotenv").config();

const generateAccessToken = (userId) => {
  const payload = {
    iss: process.env.STRINGEE_KEY_SID, // KeySID từ Stringee
    iat: Math.floor(Date.now() / 1000), // Thời gian hiện tại
    exp: Math.floor(Date.now() / 1000) + 86400, // Hết hạn sau 1 ngày
    userId, // ID người dùng
  };

  const token = jwt.sign(payload, "YOUR_KEY_SECRET"); // KeySecret từ Stringee
  return token;
};
module.exports = { generateAccessToken };
