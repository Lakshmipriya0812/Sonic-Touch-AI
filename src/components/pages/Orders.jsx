import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No auth token found, redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);

        if (error.response?.status === 401) {
          console.warn("Session expired, logging out...");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          setError("Failed to fetch orders. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        📜 My Orders
      </h2>
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          <p className="text-gray-600 mt-2">Fetching your orders...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border p-4 rounded-md mb-4 shadow-sm">
            <h3 className="font-semibold mt-4 text-xl">🛍️ Items:</h3>
            <ul className="list-disc pl-5">
              {order.items?.length > 0 ? (
                order.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center text-lg"
                  >
                    <span>
                      {item.name} (x{item.quantity}) -{" "}
                      <span className="text-green-600">
                        ${item.price.toFixed(2)}
                      </span>
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No items found.</p>
              )}
            </ul>
            <h2 className="text font-light mt-2">Order ID: {order._id}</h2>
            <p className="text-gray-600 mt-4">
              Status:{" "}
              <span
                className={`font-semibold ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {order.status}
              </span>
            </p>

            <div className="mt-4 flex space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition"
                onClick={() =>
                  navigate(`/order/${order._id}`, {
                    state: { orderDetails: order },
                  })
                }
              >
                🔍 View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
