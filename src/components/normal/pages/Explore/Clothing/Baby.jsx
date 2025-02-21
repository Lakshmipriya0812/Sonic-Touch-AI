import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/HeroSection";
import CategoryList from "../../../components/CategoryList";
import ProductGrid from "../../../components/ProductGrid";

const Baby = () => {
  const { subcategory } = useParams(); // Get subcategory if clicked

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section for Baby */}
      <HeroSection
        title="Baby's Clothing"
        subtitle="Discover the latest trends in Baby's fashion!"
      />

      {/* Category Section (Shirts, Pants, etc.) */}
      <CategoryList categoryType="baby" />

      {/* Product Grid: Show all Baby clothing by default */}
      <ProductGrid categoryType={subcategory ? subcategory : "baby"} />
    </div>
  );
};

export default Baby;
