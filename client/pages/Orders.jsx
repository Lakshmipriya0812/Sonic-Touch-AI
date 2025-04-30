import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response?.status === 401) {
        setError("Please log in to view your orders");
        navigate('/login');
      } else {
        setError("Failed to fetch orders. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">My Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No orders found</p>
          <button
            onClick={() => navigate("/explore")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "shipped"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      {item.size && (
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                      )}
                      {item.color && (
                        <p className="text-sm text-gray-600">Color: {item.color}</p>
                      )}
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">Shipping Address</h4>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.country}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => navigate(`/order/${order._id}`, {
                    state: { orderDetails: order }
                  })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
