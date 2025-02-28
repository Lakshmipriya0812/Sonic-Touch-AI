const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.fetchCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    const updatedCartItems = cart.items
      .filter((item) => item.productId !== null)
      .map((item) => ({
        productId: item.productId._id,
        name: item.productId.name || "Unknown Product",
        price: item.productId.price || 0.0,
        image: item.productId.image || "/default-image.jpg",
        brand: item.productId.brand || "Unknown Brand",
        quantity: item.quantity,
      }));

    res.json({ success: true, items: updatedCartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.addToCart = async (req, res) => {
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
        brand: product.brand || "Unknown Brand",
        size: size || null,
        color: color || null,
        quantity,
      });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
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
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.mergeGuestCart = async (req, res) => {
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
    console.error("Error merging guest cart:", error);
    res.status(500).json({ success: false, message: "Error merging cart" });
  }
};
