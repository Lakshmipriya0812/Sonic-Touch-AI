import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const placeOrder = async (shippingAddress, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/orders`,
      { shippingAddress },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error.response?.data || error);
    throw error;
  }
};

export const getUserOrders = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching user orders:", error.response?.data || error);
    throw error;
  }
};
