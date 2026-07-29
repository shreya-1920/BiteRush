import axios from "axios";

const API = "http://localhost:5000/api/restaurant";

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