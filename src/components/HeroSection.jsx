import React from "react";

const slides = [
  {
    title: "Collections",
    description:
      "You Can Explore And Shop Many Different Collections From Various Brands Here.",
    image: "/images/cloth-1.jpg",
  },
  {
    title: "Exclusive Trends",
    description:
      "Discover the latest fashion trends and elevate your style today.",
    image: "/images/cloth-2.jpg",
  },
  {
    title: "Best Offers",
    description:
      "Get the best discounts on premium quality clothing and accessories.",
    image: "/images/cloth-3.jpg",
  },
];

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden mt-4">
      <div className="w-full flex transition-transform duration-700">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            {/* Image with Hover Scale Effect */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay with Gradient and Smooth Text Animation */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 bg-gradient-to-b from-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100">
              <h1 className="text-white text-4xl font-bold transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {slide.title}
              </h1>
              <p className="text-white mt-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {slide.description}
              </p>
              <button className="bg-white text-black px-6 py-2 mt-4 rounded-lg hover:bg-gray-200 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
