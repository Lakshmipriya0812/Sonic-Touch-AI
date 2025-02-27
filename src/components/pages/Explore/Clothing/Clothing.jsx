import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Clothing = () => {
  const { subcategory, subsubcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Clothing"
        subtitle="Browse the latest fashion trends"
      />
      <CategoryList categoryType="clothing" />
      <ProductGrid
        categoryType="Clothing"
        subcategory={subcategory}
        subsubcategory={subsubcategory}
      />
    </div>
  );
};

export default Clothing;
