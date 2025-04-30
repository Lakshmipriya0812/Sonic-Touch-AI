import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import CartModal from "../components/features/cart/CartModal";
import WishlistModal from "../components/features/wishlist/WishlistModal";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isModalOpen, closeModal } = useContext(CartContext);
  const {
    addToWishlist,
    isInWishlist,
    removeFromWishlist,
    isModalOpen: isWishlistModalOpen,
    closeModal: closeWishlistModal,
  } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, navigate);
  };

  const handleWishlistClick = async () => {
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}
        {product && (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-contain rounded-lg shadow-md"
                />
                <button
                  onClick={handleWishlistClick}
                  className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
                  title={
                    isInWishlist(product._id)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"
                  }
                >
                  {isInWishlist(product._id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-pink-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-400 hover:text-pink-300 transition-colors duration-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-2xl font-semibold text-blue-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="border-t border-b border-gray-200 py-4">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">Category:</span>
                    <span className="text-gray-900">{product.category}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium">
                      Availability:
                    </span>
                    <span
                      className={`font-medium ${
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>

                  {product.material && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 font-medium">
                        Material:
                      </span>
                      <span className="text-gray-900">{product.material}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {product.size && product.size.length > 0 && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Select Size
                      </label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Choose a size</option>
                        {product.size.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {product.color && product.color.length > 0 && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Select Color
                      </label>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Choose a color</option>
                        {product.color.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={
                      !product.stock ||
                      (product.size &&
                        product.size.length > 0 &&
                        !selectedSize) ||
                      (product.color &&
                        product.color.length > 0 &&
                        !selectedColor)
                    }
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CartModal isOpen={isModalOpen} closeModal={closeModal} />
      <WishlistModal
        isOpen={isWishlistModalOpen}
        closeModal={closeWishlistModal}
      />
    </div>
  );
};

export default ProductDetail;
