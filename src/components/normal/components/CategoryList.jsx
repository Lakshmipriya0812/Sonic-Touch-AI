import React from "react";
import { useNavigate } from "react-router-dom";
// ✅ Corrected import path
import { categoryData } from "../data/categoryData";

const CategoryList = ({ categoryType }) => {
  const navigate = useNavigate();
  const categories = categoryData[categoryType] || [];

  return (
    <div className="text-center py-8">
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex flex-col items-center bg-gray-100 hover:bg-gray-200 p-4 rounded-lg shadow-md transition cursor-pointer"
            onClick={() => navigate(category.path)}
          >
            <div className="text-3xl">{category.icon}</div>
            <p className="mt-2 font-medium text-gray-700">{category.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
