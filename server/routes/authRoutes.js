const express = require("express");
const {
  registerUser,
  loginUser,
  loginAdmin,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", loginAdmin);

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/profile", protect, async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ message: "Current password is incorrect." });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    const updatedUser = await User.findById(req.user.id).select("-password");
    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
