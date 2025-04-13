import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/ecommerce.json";

const CategoryLandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-0 flex justify-center items-center">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
        />
      </div>

      <div className="flex justify-between space-x-8">
        <section className="flex-1 my-12 bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
            Clothing
          </h2>
          <p className="text-center text-lg text-gray-700 mb-6">
            Browse the latest fashion trends for men, women, and children.
          </p>
          <div className="text-center">
            <Link
              to="/clothing"
              className="px-8 py-4 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Shop Clothing
            </Link>
          </div>
        </section>

        <section className="flex-1 my-12 bg-green-100 p-8 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-6">
            Pet Supplies
          </h2>
          <p className="text-center text-lg text-gray-700 mb-6">
            Shop the best products for your pets — from food to accessories.
          </p>
          <div className="text-center">
            <Link
              to="/pets"
              className="px-8 py-4 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
            >
              Shop Pet Supplies
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryLandingPage;
