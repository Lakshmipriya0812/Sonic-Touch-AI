import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-4 w-full font-lato border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="md:w-1/3 space-y-3">
          <img src="/logo.png" alt="Company Logo" className="w-32" />
          <p className="text-sm text-gray-600">
            We provide high-quality services with the best customer experience.
            Your satisfaction is our priority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm mt-6 w-full max-w-2xl text-center">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition duration-300 block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition duration-300 block"
                >
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition duration-300 block"
                >
                  Customer Care
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition duration-300 block"
                >
                  Technical Help
                </Link>
              </li>
            </ul>
          </div>

          {!user && (
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Admin
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="hover:text-blue-600 transition duration-300 block"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="hover:text-blue-600 transition duration-300 block"
                  >
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {user && (
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                My Account
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/account"
                    className="hover:text-blue-600 transition duration-300 block"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="hover:text-blue-600 transition duration-300 block"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="hover:text-blue-600 transition duration-300 block"
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
