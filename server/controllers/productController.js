const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    let query = {};

    if (req.query.category) {
      query.category = { $regex: new RegExp(`^${req.query.category}$`, "i") }; // ✅ Case-insensitive match
    }
    if (req.query.subcategory) {
      query.subcategory = {
        $regex: new RegExp(`^${req.query.subcategory}$`, "i"),
      };
    }
    if (req.query.subsubcategory) {
      query.subsubcategory = {
        $regex: new RegExp(`^${req.query.subsubcategory}$`, "i"),
      };
    }
    if (req.query.search) {
      query.name = { $regex: new RegExp(req.query.search, "i") };
    }

    console.log("Product Query:", query); // ✅ Debugging Line

    const products = await Product.find(query);

    console.log("Found Products:", products); // ✅ Debugging Line

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      category,
      subcategory,
      subsubcategory,
      description,
      stock,
      size,
      color,
      material,
    } = req.body;

    if (
      !name ||
      !price ||
      !image ||
      !category ||
      !subcategory ||
      !description ||
      !stock
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const newProduct = new Product({
      name,
      price,
      image,
      category,
      subcategory,
      subsubcategory,
      description,
      stock,
      size: category === "Clothing" ? size || [] : undefined,
      color: category === "Clothing" ? color || [] : undefined,
      material: category === "Clothing" ? material || null : undefined,
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

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
