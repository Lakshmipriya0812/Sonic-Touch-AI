import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Men = () => {
  const { subcategory, subsubcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title={`Men's Clothing ${subsubcategory ? `- ${subsubcategory}` : ""}`}
        subtitle="Discover the latest trends in men's fashion!"
      />
      <CategoryList categoryType="men" />
      <ProductGrid
        categoryType="Clothing"
        subcategoryProp="Men"
        subsubcategory={subsubcategory}
      />
    </div>
  );
};

export default Men;
