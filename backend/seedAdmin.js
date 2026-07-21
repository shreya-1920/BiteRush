require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      email: "admin@biterush.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      name: "Super Admin",
      email: "admin@biterush.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin Created Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();