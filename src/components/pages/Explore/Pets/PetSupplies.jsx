import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const PetSupplies = () => {
  const { subcategory, subsubcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Pet Supplies"
        subtitle="Shop the best products for your pets"
      />
      <CategoryList categoryType="pets" />
      <ProductGrid
        categoryType="PetSupplies"
        subcategoryProp={subcategory}
        subsubcategory={subsubcategory}
      />
    </div>
  );
};

export default PetSupplies;
