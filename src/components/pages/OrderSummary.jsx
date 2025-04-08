import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { cancelOrder } from "../../api/orderApi";

const OrderSummary = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.orderDetails || null);
  const [loading, setLoading] = useState(!location.state?.orderDetails);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (location.state?.orderDetails) {
        setOrder(location.state.orderDetails);
        setLoading(false);
        return;
      }

      if (!orderId) {
        setError("Invalid order ID");
        setLoading(false);
        navigate('/orders');
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
          {
            withCredentials: true,
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          setError("Failed to fetch order details");
          navigate('/orders');
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        if (error.response?.status === 401) {
          setError("Please log in to view order details");
          navigate('/login');
        } else if (error.response?.status === 404) {
          setError("Order not found");
          navigate('/orders');
        } else {
          setError("Failed to fetch order details. Please try again later.");
          navigate('/orders');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, location.state, navigate]);

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

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">Order Not Found</p>
          <p className="text-gray-500">No order details available. Please place an order first.</p>
          <button
            onClick={() => navigate("/orders")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const handleCancelOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await cancelOrder(order._id, token);
      alert("Order canceled successfully!");
      navigate("/orders");
    } catch (error) {
      alert("Failed to cancel order. Try again later.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Order #{order._id.slice(-6).toUpperCase()}
            </h2>
            <p className="text-gray-600 mt-1">
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

        <div className="space-y-6">
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

          <div className="pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Details</h3>
                <div className="space-y-1">
                  <p className="text-gray-700">
                    <span className="font-medium">Name:</span> {order.shippingAddress.fullName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Address:</span> {order.shippingAddress.address}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">City:</span> {order.shippingAddress.city}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Postal Code:</span> {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Country:</span> {order.shippingAddress.country}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Subtotal:</span> ${order.totalPrice.toFixed(2)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Shipping:</span> $0.00
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    Total: ${order.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            {order.status === "pending" && (
              <button
                onClick={handleCancelOrder}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
              >
                Cancel Order
              </button>
            )}
            <button
              onClick={() => navigate("/orders")}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
