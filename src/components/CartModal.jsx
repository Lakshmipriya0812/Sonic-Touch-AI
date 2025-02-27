import React from "react";

const CartModal = ({ isOpen, onClose, navigate }) => {
  // ✅ Accept navigate as a prop
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
        <h2 className="text-xl font-bold mb-4">✅ Added to Cart!</h2>
        <p className="text-gray-600">Your item has been added to the cart.</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => navigate("/cart")} // ✅ Now works fine
          >
            🛒 Go to Cart
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            onClick={() => navigate("/checkout")} // ✅ Now works fine
          >
            ✅ Proceed to Checkout
          </button>
        </div>

        {/* Close button */}
        <button
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default CartModal;
