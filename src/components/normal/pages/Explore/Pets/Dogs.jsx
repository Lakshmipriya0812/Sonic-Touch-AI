import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/HeroSection";
import CategoryList from "../../../components/CategoryList";
import ProductGrid from "../../../components/ProductGrid";

const Dogs = () => {
  const { subcategory } = useParams(); // Get subcategory if clicked

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section for Dogs */}
      <HeroSection
        title="Dog Supplies"
        subtitle="Find everything your furry friend needs!"
      />

      {/* Category Section (Food, Toys, Accessories, etc.) */}
      <CategoryList categoryType="dogs" />

      {/* Product Grid: Show all dog products by default */}
      <ProductGrid categoryType={subcategory ? subcategory : "dogs"} />
    </div>
  );
};

export default Dogs;
