const express = require("express");
const {
  registerUser,
  loginUser,
  loginAdmin,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", loginAdmin);

router.get("/profile", protect, (req, res) => {
  res.json({ message: `Welcome, User ID: ${req.user.id}` });
});

module.exports = router;
