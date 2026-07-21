import axios from "axios";

const API = "http://localhost:5000/api/restaurants";

// Get all restaurants
export const getRestaurants = () => {
  return axios.get(API);
};

// Get single restaurant
export const getRestaurant = (id) => {
  return axios.get(`${API}/${id}`);
};

// Add restaurant
export const addRestaurant = (data) => {
  return axios.post(API, data);
};

// Update restaurant
export const updateRestaurant = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

// Delete restaurant
export const deleteRestaurant = (id) => {
  return axios.delete(`${API}/${id}`);
};