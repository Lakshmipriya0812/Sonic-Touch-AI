const Cart = require("../models/Cart");
const Product = require("../models/Product"); // Assuming you have a Product model if needed for validation

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user && req.user.id ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing user token",
      });
    }

    if (!productId || !quantity || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: productId, quantity, or userId",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("🔥 Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error("🔥 Error removing item from cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
