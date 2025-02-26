const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/sonic-touch";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const existingAdmin = await User.findOne({
      email: "sonictouchadmin@gmail.com",
    });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash("sonictouchadminuser", 10);

    const admin = new User({
      name: "Admin User",
      email: "sonictouchadmin@gmail.com",
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("Admin User Created Successfully");
    mongoose.disconnect();
  })
  .catch((err) => console.log("Error:", err));
