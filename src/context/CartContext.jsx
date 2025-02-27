import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import CartModal from "../components/CartModal";

export const CartContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

const CartProvider = ({ children, navigate }) => {
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

      console.log("Cart API Response:", response.data);
      setCart(response.data.items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Add to cart (Handles both guest & logged-in users)
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
        console.error(
          "Error adding to cart:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
      <CartModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        navigate={navigate}
      />
    </CartContext.Provider>
  );
};

export default CartProvider;
