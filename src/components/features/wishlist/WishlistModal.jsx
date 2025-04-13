import React, { useContext } from "react";
import { useWishlist } from "../../../context/WishlistContext";

const WishlistModal = () => {
  const { isModalOpen, modalAction, closeModal } = useWishlist();

  if (!isModalOpen) return null;

  const getModalContent = () => {
    switch (modalAction) {
      case "add":
        return {
          title: "✅ Added to Wishlist!",
          message: "The item has been added to your wishlist.",
          buttonText: "OK",
        };
      case "remove":
        return {
          title: "❌ Removed from Wishlist",
          message: "The item has been removed from your wishlist.",
          buttonText: "OK",
        };
      case "move":
        return {
          title: "🛒 Moved to Cart!",
          message: "The item has been moved to your cart.",
          buttonText: "OK",
        };
      default:
        return {
          title: "Wishlist",
          message: "Action completed successfully.",
          buttonText: "OK",
        };
    }
  };

  const { title, message, buttonText } = getModalContent();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{message}</p>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mt-4"
          onClick={closeModal}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default WishlistModal;
