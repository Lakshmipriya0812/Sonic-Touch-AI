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

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const cancelOrder = async () => {
    if (!order || order.status !== "Pending") return;
    try {
      await axios.post(`${API_URL}/api/orders/${orderId}/cancel`);
      alert("Order cancelled successfully!");
      navigate("/orders");
    } catch (err) {
      alert("Failed to cancel the order.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Products:</strong></p>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>{item.name} - {item.quantity}</li>
        ))}
      </ul>
      <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
      
      {order.status === "Pending" && (
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700"
          onClick={cancelOrder}
        >
          Cancel Order
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
