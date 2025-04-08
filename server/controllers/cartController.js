const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

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
    const userId = req.user.id;
    const { size, color } = req.query;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => {
      if (size && color) {
        return (
          item.productId.toString() !== req.params.productId ||
          item.size !== size ||
          item.color !== color
        );
      }

      return item.productId.toString() !== req.params.productId;
    });

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.mergeGuestCart = async (req, res) => {
  try {
    console.log("Starting cart merge process");
    const userId = req.user.id;
    console.log("User ID:", userId);

    let cart = await Cart.findOne({ userId });
    console.log("Existing cart:", cart);

    if (!cart) {
      console.log("No existing cart found, creating new one");
      cart = new Cart({ userId, items: [] });
    }

    if (!Array.isArray(req.body.items)) {
      console.error("Invalid items data received:", req.body.items);
      return res
        .status(400)
        .json({ success: false, message: "Invalid cart data" });
    }

    console.log("Processing guest cart items:", JSON.stringify(req.body.items, null, 2));


    for (const guestItem of req.body.items) {
      try {
        console.log("Processing item:", JSON.stringify(guestItem, null, 2));
        

        if (!guestItem.productId) {
          console.error("Item missing productId:", guestItem);
          continue;
        }


        let productId;
        try {
          productId = mongoose.Types.ObjectId.isValid(guestItem.productId)
            ? new mongoose.Types.ObjectId(guestItem.productId)
            : guestItem.productId;
          console.log("Converted productId:", productId);
        } catch (idError) {
          console.error("Error converting productId:", idError);
          continue;
        }


        const existingItem = cart.items.find(
          (item) =>
            item.productId.toString() === productId.toString() &&
            item.size === (guestItem.size || null) &&
            item.color === (guestItem.color || null)
        );

        if (existingItem) {
          console.log("Updating existing item quantity");
          existingItem.quantity += guestItem.quantity || 1;
        } else {
          console.log("Adding new item to cart");
          cart.items.push({
            productId: productId,
            quantity: guestItem.quantity || 1,
            size: guestItem.size || null,
            color: guestItem.color || null,
            name: guestItem.name || "Unknown Product",
            price: guestItem.price || 0,
            image: guestItem.image || "/default-image.jpg",
            brand: guestItem.brand || "Unknown Brand",
          });
        }
      } catch (itemError) {
        console.error("Error processing cart item:", itemError);
        console.error("Failed item data:", guestItem);
        continue;
      }
    }

    console.log("Saving cart with items:", JSON.stringify(cart.items, null, 2));
    await cart.save();
    console.log("Cart saved successfully");

    const updatedCart = await Cart.findOne({ userId })
      .populate('items.productId')
      .lean();
    
    console.log("Updated cart fetched successfully");
    
    res.json({ 
      success: true, 
      cart: updatedCart,
      message: "Cart merged successfully" 
    });
  } catch (error) {
    console.error("Error merging guest cart:", error);
    console.error("Error stack:", error.stack);
    console.error("Request body:", JSON.stringify(req.body, null, 2));
    res.status(500).json({ 
      success: false, 
      message: "Error merging cart",
      error: error.message 
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.syncCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid items format" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items = items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      brand: item.brand
    }));

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Cart sync error:", error);
    res.status(500).json({ message: "Error syncing cart" });
  }
};
