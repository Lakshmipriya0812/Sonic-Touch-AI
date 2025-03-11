import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/voice.json";

const Home = ({ isAuthenticated, handleLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Welcome to <span className="text-blue-600">Sonic Touch</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
          Your ultimate destination for premium fashion, pet essentials, and
          everything in between. Shop with confidence and style!
        </p>
      </div>

      <div className="flex justify-center items-center mb-12 max-w-full">
        <div className="relative w-full max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
          <Lottie
            animationData={animationData}
            loop={true}
            className="mx-auto w-full h-auto"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
        <Link
          to="/clothing"
          className="bg-blue-600 text-white px-10 py-5 rounded-lg text-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Shop Now
        </Link>
        <Link
          to="/about"
          className="bg-gray-200 text-gray-900 px-10 py-5 rounded-lg text-xl font-semibold hover:bg-gray-300 transition duration-300 shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Learn More
        </Link>
      </div>
      {isAuthenticated && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
