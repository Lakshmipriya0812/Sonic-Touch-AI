import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

const CartProvider = ({ children, navigate }) => {
  // Now we can access navigate here
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCart(localCart);
    } else {
      fetchCart();
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data.items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (product, selectedSize, selectedColor) => {
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existingItem = localCart.find(
        (item) =>
          item.productId === product._id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        localCart.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: selectedSize || null,
          color: selectedColor || null,
          material: product.material || null,
          quantity: 1,
        });
      }

      localStorage.setItem("guestCart", JSON.stringify(localCart));
      setCart(localCart);
      setModalOpen(true);
    } else {
      try {
        const response = await axios.post(
          `${API_URL}/api/cart/add`,
          {
            productId: product._id,
            quantity: 1,
            size: selectedSize,
            color: selectedColor,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart(response.data.cart.items);
        setModalOpen(true);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const updatedCart = localCart.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      try {
        const response = await axios.delete(
          `${API_URL}/api/cart/remove/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart(response.data.cart.items);
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return updatedCart;
    });
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return updatedCart;
    });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        closeModal,
      }}
    >
      {children}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
            <h2 className="text-xl font-bold mb-4">✅ Added to Cart!</h2>
            <p className="text-gray-600">
              Your item has been added to the cart.
            </p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => {
                  navigate("/cart");
                  closeModal();
                }}
              >
                🛒 Go to Cart
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                onClick={() => {
                  navigate("/checkout");
                  closeModal();
                }}
              >
                ✅ Proceed to Checkout
              </button>
            </div>

            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-xl"
              onClick={closeModal}
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export default CartProvider;
