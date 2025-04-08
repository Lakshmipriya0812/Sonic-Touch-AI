const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

axios.defaults.withCredentials = true;

const fetchOptions = {
  credentials: 'include',
  headers: { 
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
};

export const signupUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    return response.json();
  } catch (error) {
    console.error("Signup API error:", error);
    return { message: error.message || "Signup failed. Please try again." };
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log("Attempting login for:", email);
    const response = await fetch(`${API_URL}/api/auth/login`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    console.log("Login response:", data);

    if (data.user) {
      console.log("Login successful, restoring cart");
      await mergeGuestCart();
    }

    return data;
  } catch (error) {
    console.error("Login API error:", error);
    return { message: error.message || "Login failed. Please try again." };
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      ...fetchOptions,
      method: "POST"
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    const data = await response.json();
    localStorage.removeItem("user");
    
    return data;
  } catch (error) {
    console.error("Logout API error:", error);
    localStorage.removeItem("user");
    return { message: "Logged out successfully" };
  }
};

const mergeGuestCart = async () => {
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  if (guestCart.length === 0) return;

  try {
    const response = await fetch(`${API_URL}/api/cart/merge`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify({ items: guestCart })
    });

    if (!response.ok) {
      throw new Error('Failed to merge guest cart');
    }

    const data = await response.json();
    localStorage.removeItem("guestCart");
    return data;
  } catch (error) {
    console.error("Error merging guest cart:", error);
    throw error;
  }
};
