import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/common/HeroSection";
import CategoryList from "../../../components/features/product/CategoryList";
import ProductGrid from "../../../components/features/product/ProductGrid";

const Dog = () => {
  const { subsubcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Dog Supplies"
        subtitle="Find everything your dog needs!"
      />
      <CategoryList categoryType="dog" />
      <ProductGrid
        categoryType="PetSupplies"
        subcategoryProp="Dog"
        subsubcategory={subsubcategory}
      />
    </div>
  );
};

export default Dog;
