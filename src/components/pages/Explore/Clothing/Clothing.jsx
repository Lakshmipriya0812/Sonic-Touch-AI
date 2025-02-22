import React from "react";
import HeroSection from "../../../HeroSection";
import ProductGrid from "../../../ProductGrid";
import CategoryList from "../../../CategoryList";

const Clothing = () => {
  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Clothing"
        subtitle="Browse the latest fashion trends"
      />
      <CategoryList categoryType="clothing" />
      <ProductGrid categoryType="clothing" />
    </div>
  );
};

export default Clothing;
