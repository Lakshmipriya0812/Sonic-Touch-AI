import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/common/HeroSection";
import CategoryList from "../../../components/features/product/CategoryList";
import ProductGrid from "../../../components/features/product/ProductGrid";

const Dogs = () => {
  const { subsubcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Dog Supplies"
        subtitle="Find everything your dog needs!"
      />
      <CategoryList categoryType="dogs" />
      <ProductGrid
        categoryType="PetSupplies"
        subcategoryProp="Dog"
        subsubcategory={subsubcategory}
      />
    </div>
  );
};

export default Dogs;
