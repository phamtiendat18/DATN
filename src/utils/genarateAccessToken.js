const jwt = require("jsonwebtoken"); // Thư viện để tạo JWT
require("dotenv").config();

const apiKeySid = process.env.STRINGEE_SID_KEY;
const apiKeySecret = process.env.STRINGEE_SECRET_KEY;

const generateAccessToken = (userId, roomId) => {
  var now = Math.floor(Date.now() / 1000);
  var exp = now + 3600 * 24;

  var header = { cty: "stringee-api;v=1" };
  var payload;
  if (roomId) {
    payload = {
      jti: apiKeySid + "-" + now,
      iss: apiKeySid,
      exp: exp,
      userId: `${userId}`,
      roomId: `${roomId}`,
    };
  } else {
    payload = {
      jti: apiKeySid + "-" + now,
      iss: apiKeySid,
      exp: exp,
      userId: `${userId}`,
    };
  }

  var token = jwt.sign(payload, apiKeySecret, {
    algorithm: "HS256",
    header: header,
    noTimestamp: true,
  });
  return token;
};
module.exports = { generateAccessToken };
