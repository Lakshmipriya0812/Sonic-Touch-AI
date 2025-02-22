import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Birds = () => {
  const { subcategory } = useParams(); // Get subcategory if clicked

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Bird Supplies"
        subtitle="Find everything your feathered friend needs!"
      />
      <CategoryList categoryType="birds" />
      <ProductGrid categoryType={subcategory ? subcategory : "birds"} />
    </div>
  );
};

export default Birds;
