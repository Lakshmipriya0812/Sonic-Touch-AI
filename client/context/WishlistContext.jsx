import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

export const WishlistContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/wishlist`, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.data.success) {
        const products = response.data.data?.products || [];
        setWishlist(products);
        localStorage.setItem('wishlist', JSON.stringify(products.map(p => p._id)));
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(`${API_URL}/api/wishlist/add`, 
        { productId },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      if (response.data.success) {
        await fetchWishlist();
        showModal('add');
        return { success: true };
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add to wishlist' 
      };
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/wishlist/remove/${productId}`, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.data.success) {
        await fetchWishlist();
        showModal('remove');
        return { success: true };
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to remove from wishlist' 
      };
    }
  };

  const moveToCart = async (productId) => {
    try {
      const response = await axios.post('/api/wishlist/move-to-cart', { productId });
      if (response.data.success) {
        await fetchWishlist();
        showModal('move');
        return { success: true };
      }
    } catch (error) {
      console.error('Error moving to cart:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to move to cart' 
      };
    }
  };

  const isInWishlist = (productId) => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (storedWishlist.includes(productId)) {
      return true;
    }
    return wishlist.some(item => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        isModalOpen,
        modalAction,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        isInWishlist,
        showModal,
        closeModal,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 