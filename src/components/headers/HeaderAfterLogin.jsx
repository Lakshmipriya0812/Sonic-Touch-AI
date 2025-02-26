import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const HeaderAfterLogin = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false); // ✅ Update state instead of reloading
  };

  return (
    <nav className="bg-gray-200 shadow-md py-4 font-lato w-full">
      <div className="container mx-auto flex justify-between items-center px-6 h-20">
        <Link to="/" className="flex-shrink-0">
          <img src="/icon.jpg" alt="SonicTouch Logo" className="h-28 w-auto" />
        </Link>
        <div className="flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 font-medium hover:text-gray-900"
          >
            About
          </Link>
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
            className="text-gray-700 text-xl hover:text-gray-900"
          >
            <FaHeart />
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 text-xl hover:text-gray-900"
          >
            <FaShoppingCart />
          </Link>
          <div className="relative group">
            <button className="text-gray-700 text-xl focus:outline-none">
              <FaUser />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {user ? (
                <>
                  <p className="text-blue-400 block px-4 py-2">{user.name}</p>
                  <Link
                    to="/account"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <hr />
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderAfterLogin;
