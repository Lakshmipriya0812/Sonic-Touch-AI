import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const HeaderBeforeLogin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown on navigation change
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
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
      <nav className="bg-gray-100 text-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 py-4 font-lato w-full relative">
        <div className="container mx-auto flex justify-between items-center px-6 h-20">
          {/* Left Navigation */}
          <div className="flex items-center space-x-6">
            {/* Explore Dropdown */}
            <div className="relative z-50" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-800 font-medium focus:outline-none"
              >
                Explore
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                  <Link
                    to="/clothing"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Clothing
                  </Link>
                  <Link
                    to="/pets"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Pet Supplies
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

          {/* Logo */}
          <Link to="/" className="mx-auto">
            <img
              src="/icon.jpg"
              alt="SonicTouch Logo"
              className="h-28 w-auto"
            />
          </Link>

          {/* Right Section: Search, Cart, Sign Up/Login */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative w-56 flex items-center border rounded-md bg-gray-100 px-3">
              <input
                type="search"
                placeholder="Search"
                className="bg-transparent w-full border-none focus:outline-none py-2 px-1"
              />
              <FaSearch className="text-gray-500" />
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="text-gray-500 text-xl hover:text-gray-900 transition"
            >
              <FaShoppingCart />
            </Link>

            {/* ✅ Navigate to Login Page */}
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-500 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-900 transition duration-300 shadow-md"
            >
              Sign In
            </button>

            {/* ✅ Navigate to Signup Page */}
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderBeforeLogin;
