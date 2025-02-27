import React from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../../ProductGrid";

const SubsubcategoryPage = () => {
  const { category, subcategory, subsubcategory } = useParams();
  const safeCategory = category ? category.toLowerCase() : null;
  const safeSubcategory = subcategory ? subcategory.toLowerCase() : null;
  const safeSubsubcategory = subsubcategory
    ? subsubcategory.toLowerCase()
    : null;
  if (!safeCategory || !safeSubcategory) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Error: Invalid URL! Please select a valid category & subcategory.
        </h2>
      </div>
    );
  }
  const isClothing = safeCategory === "clothing";
  const isPets = safeCategory === "pets";

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        {isClothing && safeSubsubcategory
          ? `${safeSubcategory} - ${safeSubsubcategory}`
          : isClothing
          ? `${safeSubcategory}`
          : isPets && safeSubsubcategory
          ? `${safeSubsubcategory} for ${safeSubcategory}`
          : safeSubcategory}{" "}
      </h2>

      <ProductGrid
        categoryType={isClothing ? "Clothing" : "PetSupplies"}
        subcategoryProp={safeSubcategory}
        subsubcategory={safeSubsubcategory}
      />
    </div>
  );
};

export default SubsubcategoryPage;
