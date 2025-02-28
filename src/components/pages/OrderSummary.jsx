import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails || !orderDetails.items) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Order Not Found
        </h2>
        <p className="text-gray-600">
          No order details available. Please place an order first.
        </p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">
        ✅ Order Placed Successfully!
      </h2>
      <p className="text-gray-700 mb-2">
        <strong>Order ID:</strong> {orderDetails._id}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Status:</strong> {orderDetails.status}
      </p>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        📦 Shipping Details
      </h3>
      <p className="text-gray-700">
        <strong>Name:</strong> {orderDetails.shippingAddress.fullName}
      </p>
      <p className="text-gray-700">
        <strong>Address:</strong> {orderDetails.shippingAddress.address},{" "}
        {orderDetails.shippingAddress.city},{" "}
        {orderDetails.shippingAddress.postalCode},{" "}
        {orderDetails.shippingAddress.country}
      </p>
      <h3 className="text-xl font-semibold text-gray-800 mt-4">
        🛍️ Order Items
      </h3>
      <div className="border-b pb-4 mb-4">
        {orderDetails.items.length > 0 ? (
          orderDetails.items.map((item) => (
            <div key={item.productId} className="flex justify-between py-2">
              <p className="text-gray-700">
                {item.name} (x{item.quantity})
              </p>
              <p className="text-gray-700">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items found in order.</p>
        )}
      </div>
      <h3 className="text-xl font-semibold mt-4 text-gray-800">
        💰 Total:{" "}
        <span className="text-green-600">
          ${orderDetails.totalPrice.toFixed(2)}
        </span>
      </h3>

      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
