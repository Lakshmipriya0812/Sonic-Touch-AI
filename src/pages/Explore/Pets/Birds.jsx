import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/common/HeroSection";
import CategoryList from "../../../components/features/product/CategoryList";
import ProductGrid from "../../../components/features/product/ProductGrid";

const Birds = () => {
  const { subsubcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Bird Supplies"
        subtitle="Find everything your feathered friend needs!"
      />
      <CategoryList categoryType="birds" />
      <ProductGrid
        categoryType="PetSupplies"
        subcategoryProp="Bird"
        subsubcategory={subsubcategory}
      />
    </div>
  );
};

export default Birds;
