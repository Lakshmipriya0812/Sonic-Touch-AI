import React from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../../HeroSection";
import CategoryList from "../../../CategoryList";
import ProductGrid from "../../../ProductGrid";

const Baby = () => {
  const { subcategory, subsubcategory } = useParams();

  return (
    <div className="container mx-auto px-4">
      <HeroSection
        title="Baby's Clothing"
        subtitle="Discover the latest trends in Baby's fashion!"
      />
      <CategoryList categoryType="baby" />
      <ProductGrid
        categoryType="Clothing"
        subcategoryProp={subcategory || "Baby"}
        subsubcategory={subsubcategory}
      />
    </div>
  );
};

export default Baby;
