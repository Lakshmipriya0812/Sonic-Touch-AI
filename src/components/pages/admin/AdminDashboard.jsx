import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");

    setIsAuthenticated(false); // ✅ Update authentication state
    navigate("/admin/login", { replace: true });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <p className="text-gray-700">Welcome, Admin! You have full access.</p>
    </div>
  );
};

export default AdminDashboard;
