const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require("../controllers/orderController");
const { protect, adminProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getUserOrders);

router.get("/admin", protect, adminProtect, getAllOrders);
router.put("/:orderId", protect, adminProtect, updateOrderStatus);

router.delete("/:orderId", protect, cancelOrder);

module.exports = router;
