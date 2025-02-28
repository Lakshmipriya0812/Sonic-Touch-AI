const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, adminProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getUserOrders);

router.get("/admin", protect, adminProtect, getAllOrders);
router.put("/:orderId", protect, adminProtect, updateOrderStatus);

module.exports = router;
