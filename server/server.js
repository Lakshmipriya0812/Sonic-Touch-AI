require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors({ orgin: "*" })); // Allow requests from frontend

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("Registered Routes:");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`Route: ${r.route.path}`);
  }
});
