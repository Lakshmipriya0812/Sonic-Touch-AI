import React from "react";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Pets = () => {
  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Pet Supplies"
        subtitle="Shop the best products for your pets"
      />
      <CategoryList categoryType="pets" />
      <ProductGrid categoryType="pets" />
    </div>
  );
};

export default Pets;
