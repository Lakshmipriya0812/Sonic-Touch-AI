import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Dogs = () => {
  const { subcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Dog Supplies"
        subtitle="Find everything your furry friend needs!"
      />

      <CategoryList categoryType="dogs" />

      <ProductGrid categoryType={subcategory ? subcategory : "dogs"} />
    </div>
  );
};

export default Dogs;
