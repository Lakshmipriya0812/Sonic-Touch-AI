const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, default: 10 },
    category: {
      type: String,
      enum: ["Clothing", "PetSupplies"],
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
      enum: function () {
        return this.category === "Clothing"
          ? ["Men", "Women", "Baby", "Teens"]
          : ["Dog", "Cat", "Bird"];
      },
    },

    subsubcategory: {
      type: String,
      required: false,
      enum: function () {
        if (this.subcategory === "Men")
          return [
            "Shirts",
            "T-Shirts",
            "Pants",
            "Trousers",
            "Coats",
            "Blazers",
          ];
        if (this.subcategory === "Women")
          return [
            "Dresses",
            "Tops",
            "T-Shirts",
            "Bottoms",
            "Sleepwear",
            "WinterWear",
          ];
        if (this.subcategory === "Baby") return ["Boy", "Girl", "Unisex"];
        if (this.subcategory === "Teens") return ["Boy", "Girl"];
        if (["Dog", "Cat", "Bird"].includes(this.subcategory))
          return ["Food", "Toys"];
        return [];
      },
    },

    size: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: function () {
        return this.category === "Clothing";
      },
    },

    color: {
      type: [String],
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
        "Recycled cotton",
        "Viscose rayon",
        "Spandex",
        "Rayon",
        "Viscose",
        "Lyocell",
        "Nylon",
        "Elastane",
        "Lyocell"
      ],
      required: function () {
        return this.category === "Clothing";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
