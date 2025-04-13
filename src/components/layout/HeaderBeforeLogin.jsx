import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

const HeaderBeforeLogin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
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
  const handleSearch = (e) => {
    if (
      (e.key === "Enter" || e.type === "click") &&
      searchQuery.trim() !== ""
    ) {
      navigate(`/search?q=${searchQuery.trim()}`);
    }
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
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-10">
                  <h2 className="px-4 py-2 text-gray-800 font-bold border-b">
                    <Link
                      to="/categorylandingpage"
                      className="block hover:bg-gray-100 px-4 py-2"
                    >
                      All Category
                    </Link>
                  </h2>
                  <div className="px-4 py-2">
                    <h3 className="text-gray-800 font-semibold mb-2">
                      Clothing
                    </h3>
                    <Link
                      to="/clothing"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      All Clothing
                    </Link>
                    <Link
                      to="/clothing/men"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Men
                    </Link>
                    <Link
                      to="/clothing/women"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Women
                    </Link>
                    <Link
                      to="/clothing/baby"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Baby
                    </Link>
                    <Link
                      to="/clothing/teen"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Teen
                    </Link>
                  </div>

                  <div className="border-t my-2"></div>

                  <div className="px-4 py-2">
                    <h3 className="text-gray-800 font-semibold mb-2">
                      Pet Supplies
                    </h3>
                    <Link
                      to="/pets"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      All Pet Supplies
                    </Link>
                    <Link
                      to="/pets/cats"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Cats
                    </Link>
                    <Link
                      to="/pets/dogs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dogs
                    </Link>
                    <Link
                      to="/pets/birds"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Birds
                    </Link>
                  </div>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <FaSearch
                className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
                onClick={handleSearch}
              />
            </div>

            <Link
              to="/cart"
              className="relative text-gray-500 text-xl hover:text-gray-900 transition duration-300"
            >
              <div className="relative p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition duration-300">
                <FaShoppingCart className="text-gray-700 text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            <button
              onClick={() => navigate("/login")}
              className="bg-gray-500 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-900 transition duration-300 shadow-md"
            >
              Sign In
            </button>
            {/* 
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Sign Up
            </button>
          */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderBeforeLogin;
