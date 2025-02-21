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
    <div className="relative overflow-hidden">
      <div className="w-full flex transition-transform duration-700">
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 bg-black bg-opacity-50">
              <h1 className="text-white text-3xl font-bold">{slide.title}</h1>
              <p className="text-white mt-2">{slide.description}</p>
              <button className="bg-white text-black px-6 py-2 mt-4 rounded-lg hover:bg-gray-200">
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
