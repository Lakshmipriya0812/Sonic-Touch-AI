const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    let query = {};

    if (req.query.category) query.category = req.query.category;
    if (req.query.subcategory) query.subcategory = req.query.subcategory;
    if (req.query.subsubcategory)
      query.subsubcategory = req.query.subsubcategory;
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    if (req.query.size) {
      query.size = req.query.size;
    }

    let sortQuery = {};
    if (req.query.sort) {
      switch (req.query.sort) {
        case "priceAsc":
          sortQuery.price = 1;
          break;
        case "priceDesc":
          sortQuery.price = -1;
          break;
        case "mostPopular":
          sortQuery.popularity = -1;
          break;
        case "newest":
          sortQuery.createdAt = -1;
          break;
      }
    }

    const products = await Product.find(query).sort(sortQuery);

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
