import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/HeroSection";
import CategoryList from "../../../components/CategoryList";
import ProductGrid from "../../../components/ProductGrid";

const Birds = () => {
  const { subcategory } = useParams(); // Get subcategory if clicked

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section for Birds */}
      <HeroSection
        title="Bird Supplies"
        subtitle="Find everything your feathered friend needs!"
      />

      {/* Category Section (Food, Toys, Accessories, etc.) */}
      <CategoryList categoryType="birds" />

      {/* Product Grid: Show all bird products by default */}
      <ProductGrid categoryType={subcategory ? subcategory : "birds"} />
    </div>
  );
};

export default Birds;
