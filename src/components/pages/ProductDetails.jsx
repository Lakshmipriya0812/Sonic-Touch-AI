import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartContext"; // ✅ Import Cart Context

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // ✅ Get `addToCart` from context
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {loading && (
        <p className="text-center text-gray-500">Loading product...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {product && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-md"
          />
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            {product.name}
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <p className="text-gray-500 mt-2">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-gray-500 mt-2">
            <strong>Stock:</strong>{" "}
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </p>

          {/* ✅ Display Material (if applicable) */}
          {product.material && (
            <p className="text-gray-500 mt-2">
              <strong>Material:</strong> {product.material}
            </p>
          )}

          {/* ✅ Display Size Options (if applicable) */}
          {product.size && product.size.length > 0 && (
            <div className="mt-4">
              <label className="block text-gray-600 font-semibold">
                Select Size:
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border p-2 rounded-md w-full mt-2"
              >
                <option value="">Select</option>
                {product.size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ✅ Display Color Options (if applicable) */}
          {product.color && product.color.length > 0 && (
            <div className="mt-4">
              <label className="block text-gray-600 font-semibold">
                Select Color:
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="border p-2 rounded-md w-full mt-2"
              >
                <option value="">Select</option>
                {product.color.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ✅ Add to Cart Button */}
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-blue-600 transition"
            onClick={handleAddToCart}
            disabled={
              !product.stock ||
              (product.size && product.size.length > 0 && !selectedSize) ||
              (product.color && product.color.length > 0 && !selectedColor)
            }
          >
            Add to Cart
          </button>

          <button
            className="bg-gray-500 text-white px-6 py-3 rounded-md mt-4 ml-4 hover:bg-gray-600 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
