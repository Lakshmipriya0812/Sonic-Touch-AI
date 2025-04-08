import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth();
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setError("Please log in to place your order");
      navigate('/login', { 
        state: { 
          from: '/checkout',
          message: 'Please log in to complete your checkout'
        }
      });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Please log in to place your order");
      navigate('/login', { 
        state: { 
          from: '/checkout',
          message: 'Please log in to complete your checkout'
        }
      });
      return;
    }

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        orderDetails,
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setOrderPlaced(true);
        setOrderId(response.data.order._id);
        setCart([]);
        setShowSuccessPopup(true);
      } else {
        setError(response.data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response?.status === 401) {
        setError("Please log in to place your order.");
        navigate('/login', { 
          state: { 
            from: '/checkout',
            message: 'Please log in to complete your checkout'
          }
        });
      } else {
        setError(error.response?.data?.message || "Failed to place order. Please try again.");
      }
    }
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">🔒 Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to place your order.</p>
          <button
            onClick={() => navigate('/login', { 
              state: { 
                from: '/checkout',
                message: 'Please log in to complete your checkout'
              }
            })}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (showSuccessPopup) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleViewOrders}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                View Orders
              </button>
              <button
                onClick={handleContinueShopping}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
    </div>
  );
};

export default Checkout;
