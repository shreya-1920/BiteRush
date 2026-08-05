import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/wishlist`;

const authHeader = () => ({
    
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getWishlist = () => {
    return axios.get(API, authHeader());
};

export const addToWishlist = (data) => {
    return axios.post(API, data, authHeader());
};

export const removeWishlist = (id) => {
    return axios.delete(`${API}/${id}`, authHeader());
};