import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const LoggedInHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <nav className="bg-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 py-4 font-lato w-full relative">
      <div className="container mx-auto flex justify-between items-center px-6 h-20">
        <Link to="/" className="flex-shrink-0">
          <img src="/icon.jpg" alt="SonicTouch Logo" className="h-28 w-auto" />
        </Link>

        <div className="flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-gray-900 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 font-medium hover:text-gray-900 transition"
          >
            About
          </Link>

          <div className="relative z-50" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-800 font-medium focus:outline-none"
            >
              Explore
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
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
                  to="/clothing/kids"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Kids
                </Link>

                <div className="border-t my-2"></div>

                <h3 className="px-4 py-2 text-gray-700 font-semibold">
                  Pet Supplies
                </h3>
                <Link to="/pets" className="block px-4 py-2 hover:bg-gray-100">
                  All Pet Supplies
                </Link>
                <Link
                  to="/pets/cat"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Cat
                </Link>
                <Link
                  to="/pets/dog"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dog
                </Link>
                <Link
                  to="/pets/parrots"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Parrots
                </Link>
              </div>
            )}
          </div>
        </div>

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
            to="/wishlist"
            className="text-gray-700 text-xl hover:text-gray-900 transition"
          >
            <FaHeart />
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 text-xl hover:text-gray-900 transition"
          >
            <FaShoppingCart />
          </Link>
          <div className="relative group">
            <button className="text-gray-700 text-xl focus:outline-none">
              <FaUser />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">
                My Account
              </Link>
              <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                My Orders
              </Link>
              <hr />
              <Link to="/logout" className="block px-4 py-2 hover:bg-gray-100">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoggedInHeader;
