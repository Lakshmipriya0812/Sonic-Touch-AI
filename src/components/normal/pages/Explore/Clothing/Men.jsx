import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/HeroSection";
import CategoryList from "../../../components/CategoryList";
import ProductGrid from "../../../components/ProductGrid";

const Men = () => {
  const { subcategory } = useParams(); // Get subcategory if clicked

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section for Men */}
      <HeroSection
        title="Men's Clothing"
        subtitle="Discover the latest trends in men's fashion!"
      />

      {/* Category Section (Shirts, Pants, etc.) */}
      <CategoryList categoryType="men" />

      {/* Product Grid: Show all men’s clothing by default */}
      <ProductGrid categoryType={subcategory ? subcategory : "men"} />
    </div>
  );
};

export default Men;
