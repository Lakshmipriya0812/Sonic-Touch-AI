import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        🛒 Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image || "/default-image.jpg"} // ✅ Use a default image if missing
                  alt={item.name || "Product"}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.name || "Unknown Product"}
                  </h3>
                  <p className="text-gray-600">
                    ${item.price ? item.price.toFixed(2) : "0.00"}{" "}
                  </p>

                  {/* ✅ Display Size, Color, and Material if applicable */}
                  {item.size && (
                    <p className="text-gray-500">Size: {item.size}</p>
                  )}
                  {item.color && (
                    <p className="text-gray-500">Color: {item.color}</p>
                  )}
                  {item.material && (
                    <p className="text-gray-500">Material: {item.material}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 text-center">
          <Link to="/checkout">
            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
