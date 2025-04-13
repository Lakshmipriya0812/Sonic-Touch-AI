import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/common/HeroSection";
import CategoryList from "../../../components/features/product/CategoryList";
import ProductGrid from "../../../components/features/product/ProductGrid";

const Cats = () => {
  const { subsubcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Cat Supplies"
        subtitle="Find everything your cat needs!"
      />
      <CategoryList categoryType="cats" />
      <ProductGrid
        categoryType="PetSupplies"
        subcategoryProp="Cat"
        subsubcategory={subsubcategory}
      />
    </div>
  );
};

export default Cats;
