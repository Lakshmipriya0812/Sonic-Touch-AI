import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/HeroSection";
import CategoryList from "../../../components/CategoryList";
import ProductGrid from "../../../components/ProductGrid";

const Women = () => {
  const { subcategory } = useParams(); // Get subcategory if clicked

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section for Women */}
      <HeroSection
        title="Women's Clothing"
        subtitle="Discover the latest trends in Women's fashion!"
      />

      {/* Category Section (Shirts, Pants, etc.) */}
      <CategoryList categoryType="women" />

      {/* Product Grid: Show all Women clothing by default */}
      <ProductGrid categoryType={subcategory ? subcategory : "women"} />
    </div>
  );
};

export default Women;
