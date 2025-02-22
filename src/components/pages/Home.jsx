import React from "react";
import { Link } from "react-router-dom";

const Home = ({ isAuthenticated, handleLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Welcome to <span className="text-blue-600">Sonic Touch</span>
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-xl mx-auto">
          Your ultimate destination for premium fashion, pet essentials, and
          everything in between. Shop with confidence and style!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex space-x-6">
        <Link
          to="/clothing"
          className="bg-gray-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-500 transition duration-300 shadow-lg"
        >
          Shop Now
        </Link>
        <Link
          to="/about"
          className="bg-gray-200 text-gray-900 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-300 transition duration-300 shadow-lg"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home;
