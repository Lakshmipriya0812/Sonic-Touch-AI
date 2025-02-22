import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for React Router

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-4 w-full font-lato border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Left Section - Logo & About */}
        <div className="md:w-1/3 space-y-3">
          <img src="/logo.png" alt="Company Logo" className="w-32" />
          <p className="text-sm text-gray-600">
            We provide high-quality services with the best customer experience.
            Your satisfaction is our priority.
          </p>
        </div>

        {/* Right Section - Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm mt-6 w-full max-w-2xl text-center">
          {/* Help Section */}
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

          {/* Support Section */}
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

          {/* Admin Section */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Admin</h3>
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
        </div>
      </div>

      {/* Bottom Divider & Copyright */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
