const API_URL = import.meta.env.VITE_API_URL;

export const signupUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    return response.json();
  } catch (error) {
    console.error("Signup API error:", error);
    return { message: "Signup failed. Please try again." };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      // Merge guest cart into user cart
      mergeGuestCart();
    }

    return data;
  } catch (error) {
    console.error("Login API error:", error);
    return { message: "Login failed. Please try again." };
  }
};

// ✅ Merge Guest Cart with User Cart
const mergeGuestCart = async () => {
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  if (guestCart.length === 0) return;

  const token = localStorage.getItem("token");
  try {
    await axios.post(
      `${API_URL}/api/cart/merge`,
      { items: guestCart },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.removeItem("guestCart"); // Clear guest cart after merging
  } catch (error) {
    console.error("Error merging guest cart:", error);
  }
};
