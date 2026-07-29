import axios from "axios";

const API = "http://localhost:5000/api/restaurant";

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