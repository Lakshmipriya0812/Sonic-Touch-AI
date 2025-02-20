import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import HeroSection from "../../../HeroSection";
import CategoriesNav from "../../../CategoriesNav";
import NewArrivals from "../../../NewArrivals";
import ProductGrid from "../../../components/ProductGrid";

const Clothing = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Placeholder API call (Will connect with backend later)
  useEffect(() => {
    // Placeholder Data (Replace with API later)
    const sampleProducts = [
      { id: 1, name: "Blue Dress", price: 80, image: "/images/dress1.jpg" },
      {
        id: 2,
        name: "Summer Outfit",
        price: 150,
        oldPrice: 200,
        image: "/images/dress2.jpg",
      },
      {
        id: 3,
        name: "Casual Wear",
        price: 90,
        oldPrice: 100,
        image: "/images/dress3.jpg",
      },
    ];
    setFeaturedProducts(sampleProducts);
  }, []);

  return (
    <Container className="my-4">
      {/* Hero Section */}
      <HeroSection
        title="CLOTHES"
        image="/images/clothing-banner.jpg" // Replace with actual image
      />

      {/* Categories Navigation */}
      <CategoriesNav
        categories={["Men", "Women", "Kids"]}
        basePath="/clothing"
      />

      {/* New Arrivals Section */}
      <NewArrivals />

      {/* Featured Products Section */}
      <h3 className="text-center my-4">Featured</h3>
      <ProductGrid products={featuredProducts} />
    </Container>
  );
};

export default Clothing;
