import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ProductGrid = ({ categoryType, subcategoryProp, subsubcategory }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();

      if (categoryType) queryParams.append("category", categoryType);
      if (subcategoryProp) queryParams.append("subcategory", subcategoryProp);
      if (subsubcategory) queryParams.append("subsubcategory", subsubcategory);
      if (minPrice) queryParams.append("minPrice", Number(minPrice));
      if (maxPrice) queryParams.append("maxPrice", Number(maxPrice));
      if (selectedSize) queryParams.append("size", selectedSize);
      if (sortOption) queryParams.append("sort", sortOption);

      const response = await axios.get(
        `${API_URL}/api/products?${queryParams.toString()}`
      );
      setProducts(response.data.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryType, subcategoryProp, subsubcategory]);

  return (
    <div className="bg-gray-100 py-12 mt-4">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8 font-lato">
          Explore Our Products
        </h2>

        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 rounded-md"
          />

          {categoryType === "Clothing" && (
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="">All Sizes</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          )}

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>

          <button
            onClick={fetchProducts}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

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
                    className="w-full h-52 object-contain rounded-md"
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
