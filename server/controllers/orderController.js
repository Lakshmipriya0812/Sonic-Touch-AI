const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart is empty!" });
    }

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress,
      totalPrice,
      status: "Pending",
    });

    await order.save();
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res
      .status(201)
      .json({ success: true, message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order status updated!", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized!" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Only pending orders can be canceled!" });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ success: true, message: "Order canceled successfully!" });
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};
