import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

const CartProvider = ({ children, navigate }) => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCart(localCart);
    }
  }, [token]);

  const fetchCart = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(response.data.items);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error);
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
      openModal();
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
        openModal();
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
  const mergeGuestCart = async () => {
    if (!token) return;

    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    if (guestCart.length === 0) return;
    try {
      const response = await axios.post(
        `${API_URL}/api/cart/merge`,
        { items: guestCart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(response.data.cart.items);
      localStorage.removeItem("guestCart");
    } catch (error) {
      console.error(" Error merging guest cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        isModalOpen,
        closeModal,
        mergeGuestCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
