import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/recommendations`;

export const getRecommendations = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};