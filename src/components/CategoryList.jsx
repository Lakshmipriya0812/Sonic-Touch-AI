import React from "react";
import { useNavigate } from "react-router-dom";
// ✅ Importing category data correctly
import { categoryData } from "./data/categoryData";

const CategoryList = ({ categoryType }) => {
  const navigate = useNavigate();
  const categories = categoryData[categoryType] || [];

  return (
    <div className="bg-gray-100 py-12 mt-4">
      {" "}
      {/* Matches Navbar & Footer */}
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6 font-lato">
          Browse Categories
        </h2>
        <p className="text-lg text-gray-600 mb-8 font-lato">
          Explore different collections and discover your favorites.
        </p>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md transition-all duration-300 transform hover:shadow-lg hover:scale-105"
              onClick={() => navigate(category.path)}
            >
              {/* Icon */}
              <div className="text-4xl text-gray-800">{category.icon}</div>
              {/* Category Name */}
              <p className="mt-3 font-medium text-gray-700 text-lg">
                {category.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
