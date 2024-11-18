const jwt = require("jsonwebtoken"); // Thư viện để tạo JWT
require("dotenv").config();

const apiKeySid = process.env.STRINGEE_SID_KEY;
const apiKeySecret = process.env.STRINGEE_SECRET_KEY;

const generateAccessToken = () => {
  var now = Math.floor(Date.now() / 1000);
  var exp = now + 86400;

  var header = { cty: "stringee-api;v=1" };
  var payload = {
    jti: apiKeySid + "-" + now,
    iss: apiKeySid,
    exp: exp,
    rest_api: true,
  };

  var token = jwt.sign(payload, apiKeySecret, {
    algorithm: "HS256",
    header: header,
  });
  return token;
};
module.exports = { generateAccessToken };
