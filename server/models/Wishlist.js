const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true 
});

wishlistSchema.index({ user: 1, 'products.product': 1 }, { unique: true });


wishlistSchema.pre('save', function(next) {
  const uniqueProducts = new Set(this.products.map(p => p.product.toString()));
  if (uniqueProducts.size !== this.products.length) {
    next(new Error('Duplicate products in wishlist'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Wishlist', wishlistSchema); 