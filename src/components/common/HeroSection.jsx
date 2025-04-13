import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/ecommerce.json";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const clothSlides = [
    {
      title: "Collections",
      description:
        "You Can Explore And Shop Many Different Collections From Various Brands Here.",
      image: "/hero1.jpg",
    },
    {
      title: "Exclusive Trends",
      description:
        "Discover the latest fashion trends and elevate your style today.",
      image: "/hero2.jpg",
    },
    {
      title: "Best Offers",
      description:
        "Get the best discounts on premium quality clothing and accessories.",
      image: "/hero3.jpg",
    },
  ];

  const petSlides = [
    {
      title: "Pet Accessories",
      description:
        "Explore premium pet accessories and give your pet the best!",
      image: "/pet-pet1.jpg",
    },
    {
      title: "Pet Health",
      description: "Keep your pet healthy with the best supplies available.",
      image: "/pet-pet2.jpg",
    },
    {
      title: "Best Offers",
      description:
        "Get discounts on pet supplies and accessories for your furry friends.",
      image:
        "https://pyxis.nymag.com/v1/imgs/f55/980/f57a2f1d6de4cbf768e5f97fb39f69caa7-dog-food-106-final.rhorizontal.w1100.jpg", // External image URL
    },
  ];

  const slides = location.pathname === "/pets" ? petSlides : clothSlides;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      renderer: "svg",
    },
  };

  return (
    <div className="relative overflow-hidden mt-4">
      <div className="w-full flex transition-transform duration-700">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 bg-gradient-to-b from-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100">
              <h1 className="text-white text-4xl font-bold transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {slide.title}
              </h1>
              <p className="text-white mt-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {slide.description}
              </p>
              <button
                onClick={openModal}
                className="bg-white text-black px-6 py-2 mt-4 rounded-lg hover:bg-gray-200 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all duration-300 scale-105">
            <div className="flex justify-center mb-6">
              <Lottie options={defaultOptions} height={200} width={200} />{" "}
            </div>
            <h2 className="text-2xl font-semibold text-center text-pink-500 mb-4 animate__animated animate__fadeIn">
              Coming Soon!
            </h2>
            <p className="text-center text-gray-600 mb-6 animate__animated animate__fadeIn animate__delay-1s">
              This feature is coming soon. Stay tuned for updates!
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={closeModal}
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-400 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
