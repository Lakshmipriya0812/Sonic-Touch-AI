const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, default: 1 },

    // ✅ Categories with hierarchical subcategories
    category: {
      type: String,
      enum: ["Clothing", "PetSupplies"],
      required: true,
    },

    subcategory: {
      type: String,
      enum: ["Men", "Women", "Baby", "Teens", "Dog", "Cat", "Bird"],
      required: true,
    },

    subsubcategory: {
      type: String,
      enum: [
        // ✅ Clothing → Men
        "Shirts",
        "T-Shirts",
        "Pants",
        "Trousers",
        "Coats",
        "Blazers",
        // ✅ Clothing → Women
        "Dresses",
        "Tops",
        "T-Shirts",
        "Bottoms",
        "Sleepwear",
        "WinterWear",
        // ✅ Clothing → Baby
        "Boy",
        "Girl",
        "Unisex",
        // ✅ Clothing → Teens
        "Boy",
        "Girl",
        // ✅ Pet Supplies → Dog, Cat, Bird
        "Food",
        "Toys",
      ],
      required: false,
    },

    // ✅ Clothing-specific fields (only applicable if `category` is "Clothing")
    size: {
      type: [String], // ✅ Array of available sizes
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: function () {
        return this.category === "Clothing";
      }, // ✅ Required only for Clothing
    },

    color: {
      type: [String], // ✅ Array for multiple color options
      required: function () {
        return this.category === "Clothing";
      },
    },

    material: {
      type: String,
      enum: [
        "Cotton",
        "Polyester",
        "Wool",
        "Denim",
        "Leather",
        "Silk",
        "Linen",
        "Synthetic",
      ],
      required: function () {
        return this.category === "Clothing";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
