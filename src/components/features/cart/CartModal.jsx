import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

const CartModal = ({ isOpen }) => {
  const { closeModal } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">✅ Added to Cart!</h2>
        <p className="text-gray-600">Your item has been added to the cart.</p>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition mt-4"
          onClick={closeModal}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CartModal;
