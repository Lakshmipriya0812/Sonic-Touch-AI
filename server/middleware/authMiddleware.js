const jwt = require("jsonwebtoken");
const User = require("../models/User"); // ✅ Ensure you have a User model

const protect = async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    // ✅ Ensure the token starts with "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1]; // Remove "Bearer " prefix
    }

    // ✅ Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch the user from the database to ensure they exist
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found, authentication failed" });
    }

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;
