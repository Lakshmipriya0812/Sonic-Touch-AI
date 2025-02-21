import React from "react";
import HeroSection from "../../../components/HeroSection";
import CategoryList from "../../../components/CategoryList";
import ProductGrid from "../../../components/ProductGrid";

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
