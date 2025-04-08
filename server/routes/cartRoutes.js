const express = require("express");
const {
  fetchCart,
  addToCart,
  removeFromCart,
  mergeGuestCart,
  syncCart
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, fetchCart);
router.post("/add", protect, addToCart);
router.delete("/remove/:productId", protect, removeFromCart);
router.post("/merge", protect, mergeGuestCart);
router.post("/sync", protect, syncCart);

module.exports = router;
