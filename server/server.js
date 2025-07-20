require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  helmet,
  generalLimiter,
  authLimiter,
  apiLimiter,
  securityHeaders,
  corsConfig
} = require("./config/security");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const rasaRoutes = require("./routes/rasaRoutes");
const wishlistRoutes = require("./routes/wishlist");

const app = express();

// Security middleware
app.use(helmet);
app.use(generalLimiter);
app.use(securityHeaders);

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", apiLimiter, productRoutes);
app.use("/api/cart", apiLimiter, cartRoutes);
app.use("/api/orders", apiLimiter, orderRoutes);
app.use("/api", apiLimiter, rasaRoutes);
app.use("/api/wishlist", apiLimiter, wishlistRoutes);

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
