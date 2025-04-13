import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../components/common/HeroSection";
import CategoryList from "../../../components/features/product/CategoryList";
import ProductGrid from "../../../components/features/product/ProductGrid";

const Teen = () => {
  const { subcategory, subsubcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Teen's Clothing"
        subtitle="Discover the latest trends in Teen's fashion!"
      />
      <CategoryList categoryType="teen" />
      <ProductGrid
        categoryType="Clothing"
        subcategoryProp={subcategory || "Teen"}
        subsubcategory={subsubcategory}
      />
    </div>
  );
};

export default Teen;
