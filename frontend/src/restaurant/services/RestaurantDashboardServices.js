import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/restaurant`;

const getAuthConfig = () => {
  const token = localStorage.getItem("restaurantToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDashboard = async (filter = "week") => {

    const res = await axios.get(
        `${API}/dashboard?filter=${filter}`,
        getAuthConfig()
    );

    return res.data;
};