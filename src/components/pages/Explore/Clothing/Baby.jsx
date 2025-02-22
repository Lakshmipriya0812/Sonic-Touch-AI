import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Baby = () => {
  const { subcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Baby's Clothing"
        subtitle="Discover the latest trends in Baby's fashion!"
      />
      <CategoryList categoryType="baby" />
      <ProductGrid categoryType={subcategory ? subcategory : "baby"} />
    </div>
  );
};

export default Baby;
