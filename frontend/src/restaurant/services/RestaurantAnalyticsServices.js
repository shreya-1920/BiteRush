import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/restaurant`;

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("restaurantToken")}`,
  },
});

export const getAnalytics = async (filter="week") => {

    const res = await axios.get(

        `${API}/analytics?filter=${filter}`,

        getAuthConfig()

    );

    return res.data;

};