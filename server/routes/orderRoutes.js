const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderDetails, // Import getOrderDetails
} = require("../controllers/orderController");

const { protect, adminProtect } = require("../middleware/authMiddleware");

const router = express.Router();

// Existing routes
router.post("/", protect, createOrder); // Create order
router.get("/", protect, getUserOrders); // Get orders for the logged-in user

// Admin-only route to get all orders
router.get("/admin", protect, adminProtect, getAllOrders);

// Admin route to update order status
router.put("/:orderId", protect, adminProtect, updateOrderStatus);

// Route for canceling order
router.delete("/:orderId", protect, cancelOrder);

// New route to view order details
router.get("/:orderId", protect, getOrderDetails); // GET route for order details by orderId

module.exports = router;
