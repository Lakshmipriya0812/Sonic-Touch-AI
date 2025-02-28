import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

const HeaderAfterLogin = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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
    setIsAuthenticated(false);
    navigate("/clothing");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
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
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
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
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderAfterLogin;
