import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Cats = () => {
  const { subcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Cat Supplies"
        subtitle="Find everything your feline friend needs!"
      />
      <CategoryList categoryType="cats" />
      <ProductGrid categoryType={subcategory ? subcategory : "cats"} />
    </div>
  );
};

export default Cats;
