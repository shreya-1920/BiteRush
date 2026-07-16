import axios from "axios";

const API = "http://localhost:5000/api/cart";

const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getCart = () =>
    axios.get(API, getAuthConfig());

export const addCart = (item) =>
    axios.post(API, item, getAuthConfig());

export const updateCart = (id, quantity) =>
    axios.put(
        `${API}/${id}`,
        { quantity },
        getAuthConfig()
    );

export const removeCart = (id) =>
    axios.delete(
        `${API}/${id}`,
        getAuthConfig()
    );

export const clearCart = () =>
    axios.delete(
        API,
        getAuthConfig()
    );