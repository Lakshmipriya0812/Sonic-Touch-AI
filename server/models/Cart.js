const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 },
      size: { type: String, default: null },
      color: { type: String, default: null },
      brand: { type: String, default: "Unknown Brand" }
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
