const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔹 User Signup
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token for Users
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Admin Login Function (Admins Only)
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    let admin = await User.findOne({ email, isAdmin: true });
    if (!admin)
      return res.status(403).json({ message: "Access Denied: Not an admin" });

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token for Admins
    const token = jwt.sign(
      { id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, loginAdmin };
