import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ProductGrid = ({ categoryType }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // ✅ Format categoryType to match database case
        const formattedCategory =
          categoryType.charAt(0).toUpperCase() + categoryType.slice(1);

        const response = await axios.get(
          `${API_URL}/api/products?category=${formattedCategory}`
        );

        console.log("Fetched Products:", response.data.products); // ✅ Debugging Line
        setProducts(response.data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryType]);

  return (
    <div className="bg-gray-100 py-12 mt-4">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8 font-lato">
          Explore Our Products
        </h2>
        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-md rounded-lg p-5 cursor-pointer transition-transform transform hover:shadow-lg hover:scale-105"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover rounded-md"
                  />
                  <div className="mt-4 text-center">
                    <h5 className="font-semibold text-lg text-gray-900">
                      {product.name}
                    </h5>
                    <p className="text-gray-600 text-lg mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No products found in this category.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
