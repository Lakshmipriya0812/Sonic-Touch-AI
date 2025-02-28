import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import axios from "axios";

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !shippingInfo.fullName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.postalCode ||
      !shippingInfo.country
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderDetails = {
      shippingAddress: shippingInfo,
      items: cart,
      totalPrice,
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No auth token found!");
        setError("Unauthorized: Please log in again.");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        orderDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setOrderId(response.data.order._id);
        setOrderPlaced(true);
        setCart([]);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        🛍️ Checkout
      </h2>
      <div className="mb-6 border-b pb-4">
        <h3 className="text-xl font-semibold text-gray-800">🛒 Your Items</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  {item.size && (
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  )}
                  {item.color && (
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        📦 Shipping Address
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block font-semibold text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter city"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter postal code"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={shippingInfo.country}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter country"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          🛒 Place Order
        </button>
      </form>

      {orderPlaced && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-green-600">
              🎉 Order Placed!
            </h3>
            <p className="text-gray-700">
              Your order has been successfully placed.
            </p>

            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/orders")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                View My Orders
              </button>
              <button
                onClick={() => navigate("/explore")}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
