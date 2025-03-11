import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

const AdminDashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");

    setIsAuthenticated(false);
    navigate("/admin/login", { replace: true });
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <main className="flex-1 bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Dashboard
        </h1>
        <p className="text-gray-700">Welcome, Admin! You have full access.</p>
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-blue-500 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-600 transition duration-300 mb-4"
        >
          Manage Products
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-3 px-6 rounded-md font-medium hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;
