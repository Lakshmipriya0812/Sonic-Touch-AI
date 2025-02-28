const express = require("express");
const {
  fetchCart,
  addToCart,
  removeFromCart,
  mergeGuestCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, fetchCart);
router.post("/add", protect, addToCart);
router.delete("/remove/:productId", protect, removeFromCart);
router.post("/merge", protect, mergeGuestCart);

module.exports = router;
