const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const mongoose = require('mongoose');

const sendResponse = (res, status, success, message, data = null) => {
  return res.status(status).json({
    success,
    message,
    data
  });
};


exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate('products.product', 'name price image')
      .select('products');

    if (!wishlist) {
      return sendResponse(res, 200, true, 'Wishlist is empty', { products: [] });
    }

    sendResponse(res, 200, true, 'Wishlist retrieved successfully', wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    sendResponse(res, 500, false, 'Failed to fetch wishlist');
  }
};


exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;


    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return sendResponse(res, 400, false, 'Invalid product ID format');
    }

    const product = await Product.findById(productId);
    if (!product) {
      return sendResponse(res, 404, false, 'Product not found');
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        products: [{ product: productId }]
      });
    } else {

      const existingProduct = wishlist.products.find(
        item => item.product.toString() === productId
      );

      if (existingProduct) {
        return sendResponse(res, 400, false, 'Product already in wishlist');
      }

      wishlist.products.push({ product: productId });
    }

    await wishlist.save();
    sendResponse(res, 201, true, 'Product added to wishlist successfully', wishlist);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    if (error.message === 'Duplicate products in wishlist') {
      sendResponse(res, 400, false, 'Product already in wishlist');
    } else {
      sendResponse(res, 500, false, 'Failed to add product to wishlist');
    }
  }
};


exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return sendResponse(res, 400, false, 'Invalid product ID format');
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      return sendResponse(res, 404, false, 'Wishlist not found');
    }

    const productExists = wishlist.products.some(
      item => item.product.toString() === productId
    );

    if (!productExists) {
      return sendResponse(res, 404, false, 'Product not found in wishlist');
    }

    wishlist.products = wishlist.products.filter(
      item => item.product.toString() !== productId
    );

    await wishlist.save();
    sendResponse(res, 200, true, 'Product removed from wishlist successfully', wishlist);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    sendResponse(res, 500, false, 'Failed to remove product from wishlist');
  }
};


exports.moveToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return sendResponse(res, 400, false, 'Invalid product ID format');
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      return sendResponse(res, 404, false, 'Wishlist not found');
    }

    const productIndex = wishlist.products.findIndex(
      item => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return sendResponse(res, 404, false, 'Product not found in wishlist');
    }

    wishlist.products.splice(productIndex, 1);
    await wishlist.save();


    sendResponse(res, 200, true, 'Product moved to cart successfully');
  } catch (error) {
    console.error('Error moving to cart:', error);
    sendResponse(res, 500, false, 'Failed to move product to cart');
  }
}; 