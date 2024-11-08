const bcrypt = require("bcryptjs");
const Users = require("../models/users");
const Roles = require("../models/roles");

// Hàm tạo Admin mặc định
const createAdmin = async () => {
  try {
    const adminRole = await Roles.findOne({ where: { name: "Admin" } });

    if (!adminRole) {
      await Roles.create({ name: "Admin" });
    }
    const adminUser = await Users.findOne({ where: { username: "admin" } });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await Users.create({
        username: "admin",
        password: hashedPassword,
        role_id: adminRole.dataValues.id,
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.log("Error creating admin:", err);
  }
};

// Gọi hàm tạo Admin khi khởi động server
module.exports = createAdmin;
