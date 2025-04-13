import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: No token provided");

        const response = await axios.get(`${API_URL}/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data?.order?.items) {
          throw new Error("Invalid order data received");
        }

        setOrder(response.data.order);
      } catch (err) {
        console.error("Fetch Order Error:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized access. Please log in.");
          navigate("/login");
        } else {
          setError(err.message || "Failed to load order details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  const cancelOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsModalOpen(false);
      navigate("/orders");
    } catch (err) {
      console.error("Cancel Order Error:", err);
      alert("Failed to cancel the order.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Products:</strong>
      </p>
      <ul className="list-disc pl-5">
        {order.items?.length > 0 ? (
          order.items.map((item, i) => (
            <li key={i} className="flex justify-between items-center text-lg">
              <span>
                {item.name} (x{item.quantity}) -{" "}
                <span className="text-green-600">${item.price.toFixed(2)}</span>
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No items found.</p>
        )}
      </ul>
      <p>
        <strong>Shipping Address:</strong> {order.shippingAddress?.address},{" "}
        {order.shippingAddress?.city}, {order.shippingAddress?.country}
      </p>

      {order.status === "Pending" && (
        <>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700"
            onClick={() => setIsModalOpen(true)}
          >
            Cancel Order
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">
                  Confirm Cancellation
                </h2>
                <p>Are you sure you want to cancel this order?</p>
                <div className="flex justify-end mt-4 space-x-3">
                  <button
                    className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500"
                    onClick={() => setIsModalOpen(false)}
                  >
                    No, Go Back
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                    onClick={cancelOrder}
                  >
                    Yes, Cancel Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
