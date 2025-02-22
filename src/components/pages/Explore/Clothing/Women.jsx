import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Women = () => {
  const { subcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Women's Clothing"
        subtitle="Discover the latest trends in Women's fashion!"
      />
      <CategoryList categoryType="women" />{" "}
      <ProductGrid categoryType={subcategory ? subcategory : "women"} />
    </div>
  );
};

export default Women;
