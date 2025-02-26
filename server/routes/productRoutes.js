const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const protect = require("../middleware/authMiddleware"); // Middleware for authentication

const router = express.Router();

// Public Routes
router.get("/", getAllProducts); // ✅ Fetch all products
router.get("/:id", getProductById); // ✅ Fetch single product by ID

// Admin Routes (Protected)
router.post("/", protect, createProduct); // ✅ Add product (Admin only)
router.put("/:id", protect, updateProduct); // ✅ Update product (Admin only)
router.delete("/:id", protect, deleteProduct); // ✅ Delete product (Admin only)

module.exports = router;
