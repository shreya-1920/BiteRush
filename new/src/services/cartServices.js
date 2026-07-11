import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const getCart = () => axios.get(API);

export const addCart = (item) => axios.post(API, item);

export const updateCart = (id, quantity) =>
    axios.put(`${API}/${id}`, { quantity });

export const removeCart = (id) =>
    axios.delete(`${API}/${id}`);

export const clearCart = () =>
    axios.delete(API);