import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/restaurant`;

// Login
export const loginRestaurant = async (data) => {
  const response = await axios.post(`${API}/login`, data);
  return response.data;
};

// Logged-in Restaurant
export const getRestaurant = async (token) => {
  const response = await axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};