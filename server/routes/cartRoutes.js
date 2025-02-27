const express = require("express");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware"); // ✅ Middleware for authentication

const router = express.Router();

// ✅ Fetch User's Cart with Populated Product Details
router.get("/", protect, async (req, res) => {
  try {
    // ✅ Ensure userId is correctly used
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      return res.json({ success: true, items: [] });
    }

    // ✅ Ensure product details are included in response
    const updatedCartItems = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name || "Unknown Product",
      price: item.productId.price || 0.0,
      image: item.productId.image || "/default-image.jpg",
      quantity: item.quantity,
    }));

    res.json({ success: true, items: updatedCartItems });
  } catch (error) {
    console.error("🔥 Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size || null,
        color: color || null,
        material: product.material || null,
        quantity,
      });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error("🔥 Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Remove Item from Cart
router.delete("/remove/:productId", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );
    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Merge Guest Cart into User Cart After Login
router.post("/merge", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    req.body.items.forEach((guestItem) => {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === guestItem.productId
      );
      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        cart.items.push(guestItem);
      }
    });

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error merging cart" });
  }
});

module.exports = router;
