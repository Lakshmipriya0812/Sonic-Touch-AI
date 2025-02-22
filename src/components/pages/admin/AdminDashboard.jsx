import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin");

  if (!isAdmin) {
    navigate("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <p className="text-gray-700">Welcome, Admin! You have full access.</p>

      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          navigate("/admin/login");
        }}
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
