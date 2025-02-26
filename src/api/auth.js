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

    return response.json();
  } catch (error) {
    console.error("Login API error:", error);
    return { message: "Login failed. Please try again." };
  }
};
