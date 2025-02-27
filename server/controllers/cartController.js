const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user && req.user.id ? req.user.id : null;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Missing user token" });
    }

    // 🛑 Check for missing fields
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
