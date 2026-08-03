import axios from "axios";

const API = "http://localhost:5000/api/recommendations";

export const getRecommendations = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};