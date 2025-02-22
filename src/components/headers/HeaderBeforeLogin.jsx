import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleClose = () => {
    setShowSignup(false);
    setShowLogin(false);
  };

  return (
    <>
      <nav className="bg-gray-100 text-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 py-4 font-lato w-full relative">
        <div className="container mx-auto flex justify-between items-center px-6 h-20">
          <div className="flex items-center space-x-6">
            <div className="relative z-50" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-800 font-medium focus:outline-none"
              >
                Explore
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                  <h3 className="px-4 py-2 text-gray-700 font-semibold">
                    Clothing
                  </h3>
                  <Link
                    to="/clothing"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    All Clothing
                  </Link>
                  <Link
                    to="/clothing/men"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Men
                  </Link>
                  <Link
                    to="/clothing/women"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Women
                  </Link>
                  <Link
                    to="/clothing/baby"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Baby
                  </Link>
                  <div className="border-t my-2"></div>
                  <h3 className="px-4 py-2 text-gray-700 font-semibold">
                    Pet Supplies
                  </h3>
                  <Link
                    to="/pets"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    All Pet Supplies
                  </Link>
                  <Link
                    to="/pets/cats"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Cats
                  </Link>
                  <Link
                    to="/pets/dogs"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dogs
                  </Link>
                  <Link
                    to="/pets/birds"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Birds
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="text-gray-700 font-medium hover:text-gray-900 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 font-medium hover:text-gray-900 transition"
            >
              Contact
            </Link>
          </div>

          <Link to="/" className="mx-auto">
            <img
              src="/icon.jpg"
              alt="SonicTouch Logo"
              className="h-28 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative w-56 flex items-center border rounded-md bg-gray-100 px-3">
              <input
                type="search"
                placeholder="What are you looking for?"
                className="bg-transparent w-full border-none focus:outline-none py-2 px-1"
              />
              <FaSearch className="text-gray-500" />
            </div>

            <Link
              to="/cart"
              className="relative text-gray-500 text-xl hover:text-gray-900 transition duration-300"
            >
              <div className="relative p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition duration-300">
                <FaShoppingCart className="text-gray-700 text-2xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5"></span>
              </div>
            </Link>

            <button
              onClick={handleShowLogin}
              className="bg-gray-500 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-900 transition duration-300 shadow-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {showSignup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-gray-200 p-6 rounded-lg w-96 shadow-lg transform scale-95 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Create an Account
            </h3>

            <form>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 p-3 mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 p-3 mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-3 mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 p-3 mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />

              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-3 mt-4 rounded-md font-medium hover:bg-gray-900 transition duration-300"
              >
                Sign Up
              </button>

              <button
                onClick={handleClose}
                className="w-full text-gray-500 mt-3 text-center block hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showLogin && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-gray-200 p-6 rounded-lg w-96 shadow-lg transform scale-95 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Welcome Back
            </h3>

            <form>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 p-3 mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-3 mt-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />

              <div className="text-right mt-2">
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-3 mt-4 rounded-md font-medium hover:bg-gray-900 transition duration-300"
              >
                Sign In
              </button>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setShowLogin(false);
                    handleShowSignup();
                  }}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Sign Up
                </button>
              </p>

              <button
                onClick={handleClose}
                className="w-full text-gray-500 mt-3 text-center block hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
