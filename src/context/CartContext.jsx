import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showAddToCartPopup, setShowAddToCartPopup] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [mergeInProgress, setMergeInProgress] = useState(false);

  let isAuthenticated = false;

  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
  } catch (error) {
    console.error("Error", error);
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const showAddToCartSuccess = (item) => {
    setAddedItem(item);
    setShowAddToCartPopup(true);
  };

  const closeAddToCartPopup = () => {
    setShowAddToCartPopup(false);
    setAddedItem(null);
  };

  useEffect(() => {
    if (!isInitialized) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCart(guestCart);
      setIsInitialized(true);
      setIsLoading(false);
    }
  }, [isInitialized]);

  useEffect(() => {
    const handleCartSync = async () => {
      if (isInitialized && isAuthenticated && !mergeInProgress) {
        try {
          setMergeInProgress(true);
          const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
          if (guestCart.length > 0) {
            await mergeGuestCart();
          }
          await fetchCart();
        } catch (error) {
          console.error("Error during cart sync:", error);
        } finally {
          setMergeInProgress(false);
        }
      }
    };

    handleCartSync();
  }, [isAuthenticated, isInitialized]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cart`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setCart(response.data.items);
      } else {
        throw new Error("Failed to fetch cart");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        setCart(guestCart);
      } else {
        console.error("Error fetching cart:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product, selectedSize, selectedColor) => {
    try {
      const existingItem = cart.find(
        (item) =>
          item.productId === product._id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      const updatedCart = existingItem
        ? cart.map((item) =>
            item.productId === product._id &&
            item.size === selectedSize &&
            item.color === selectedColor
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...cart,
            {
              productId: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
              size: selectedSize,
              color: selectedColor,
            },
          ];

      setCart(updatedCart);

      showAddToCartSuccess({
        name: product.name,
        size: selectedSize,
        color: selectedColor,
      });
      if (!isAuthenticated) {
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      }

      if (isAuthenticated) {
        await syncCartWithServer();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (isAuthenticated) {
        const response = await axios.delete(
          `${API_URL}/api/cart/remove/${productId}`,
          { withCredentials: true }
        );
        setCart(response.data.cart.items);
      } else {
        const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const updatedCart = localCart.filter(
          (item) => item.productId !== productId
        );
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
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
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    if (guestCart.length === 0) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/cart/merge`,
        { items: guestCart },
        { withCredentials: true }
      );

      if (response.data.success) {
        localStorage.removeItem("guestCart");
        setCart(response.data.cart.items);
      } else {
        throw new Error("Failed to merge cart");
      }
    } catch (error) {
      console.error("Error merging guest cart:", error);
      throw error;
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("guestCart");
  };

  const handleLogout = async () => {
    try {
      setCart([]);

      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const syncCartWithServer = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/cart/sync`,
        { items: cart },
        { withCredentials: true }
      );
      setCart(response.data.cart.items);
    } catch (error) {
      console.error("Error syncing cart with server:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        isModalOpen,
        closeModal,
        mergeGuestCart,
        clearCart,
        handleLogout,
        isLoading,
      }}
    >
      {children}
      {showAddToCartPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 transform transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-500"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Added to Cart!
              </h3>
              <p className="text-gray-600 mb-4">
                {addedItem.name}
                {addedItem.size && ` - Size: ${addedItem.size}`}
                {addedItem.color && ` - Color: ${addedItem.color}`}
              </p>
              <button
                onClick={closeAddToCartPopup}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export default CartProvider;
