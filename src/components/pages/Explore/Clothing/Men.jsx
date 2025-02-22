import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Men = () => {
  const { subcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Men's Clothing"
        subtitle="Discover the latest trends in men's fashion!"
      />
      <CategoryList categoryType="men" />
      <ProductGrid categoryType={subcategory ? subcategory : "men"} />
    </div>
  );
};

export default Men;
