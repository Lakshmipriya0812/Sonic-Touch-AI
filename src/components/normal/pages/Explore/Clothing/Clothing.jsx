import React from "react";
import HeroSection from "../../../components/HeroSection";
import ProductGrid from "../../../components/ProductGrid";
import CategoryList from "../../../components/CategoryList";

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
