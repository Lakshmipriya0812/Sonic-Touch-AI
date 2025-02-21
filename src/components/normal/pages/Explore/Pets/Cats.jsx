import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/HeroSection";
import CategoryList from "../../../components/CategoryList";
import ProductGrid from "../../../components/ProductGrid";

const Cats = () => {
  const { subcategory } = useParams(); // Get subcategory if clicked

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section for Cats */}
      <HeroSection
        title="Cat Supplies"
        subtitle="Find everything your feline friend needs!"
      />

      {/* Category Section (Food, Toys, Accessories, etc.) */}
      <CategoryList categoryType="cats" />

      {/* Product Grid: Show all cat products by default */}
      <ProductGrid categoryType={subcategory ? subcategory : "cats"} />
    </div>
  );
};

export default Cats;
