const Product = require("../models/Product");

// ✅ Get all products (with optional category filtering)
exports.getAllProducts = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.subcategory) query.subcategory = req.query.subcategory;

    const products = await Product.find(query);
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, image, category, description, stock } = req.body;

    if (!name || !price || !image || !category || !description || !stock) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      price,
      image,
      category,
      description,
      stock,
    });
    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
