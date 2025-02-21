import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dropdownRef = useRef(null);

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

  // ✅ Close Explore when clicking outside
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

  return (
    <>
      {/* 🔹 Navbar */}
      <nav className="bg-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 py-4 font-lato w-full relative">
        <div className="container mx-auto flex justify-between items-center px-6 h-20">
          {/* 🔹 Left: Explore Dropdown & Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Explore Dropdown (Fixed Click Outside Behavior) */}
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

            {/* Navigation Links */}
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

          {/* 🔹 Middle: Logo */}
          <Link to="/" className="mx-auto">
            <img
              src="/icon.jpg"
              alt="SonicTouch Logo"
              className="h-28 w-auto"
            />
          </Link>

          {/* 🔹 Right: Search Bar + Cart + Sign Up */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative w-56 flex items-center border rounded-md bg-gray-100 px-3">
              <input
                type="search"
                placeholder="What are you looking for?"
                className="bg-transparent w-full border-none focus:outline-none py-2 px-1"
              />
              <FaSearch className="text-gray-500" />
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative text-gray-700 text-xl hover:text-gray-900 transition"
            >
              <FaShoppingCart />
            </Link>

            {/* Sign Up Button */}
            <button
              onClick={handleShowSignup}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* 🔹 Login & Signup Modals (Same Functionality) */}
      {showSignup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white p-6 rounded-lg w-96 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-center">Sign Up</h3>
            <form>
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 mt-3 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 mt-3 rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 mt-3 rounded-md"
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full border p-2 mt-3 rounded-md"
              />
              <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700">
                Sign Up
              </button>
              <p className="text-center mt-3">
                Already have an account?{" "}
                <button
                  onClick={handleShowLogin}
                  className="text-blue-600 font-bold"
                >
                  Sign In
                </button>
              </p>
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
            className="bg-white p-6 rounded-lg w-96 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-center">Login</h3>
            <form>
              <input
                type="text"
                placeholder="Username"
                className="w-full border p-2 mt-3 rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 mt-3 rounded-md"
              />
              <div className="text-right mt-2">
                <a href="#" className="text-blue-600 text-sm">
                  Forgot Password?
                </a>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700">
                Login
              </button>
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <button
                  onClick={handleShowSignup}
                  className="text-blue-600 font-bold"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
