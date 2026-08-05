import axios from "axios";

const API = "http://localhost:5000/api/menu";

// Get all menu items
export const getMenus = () => {
  return axios.get(API);
};

// Get single menu item
export const getMenu = (id) => {
  return axios.get(`${API}/${id}`);
};

// Add menu item
export const addMenu = (data) => {
  return axios.post(API, data);
};

// Update menu item
export const updateMenu = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

// Delete menu item
export const deleteMenu = (id) => {
  return axios.delete(`${API}/${id}`);
};
export const getRestaurantMenu = (restaurantId) => {
  return axios.get(`${API}/restaurant/${restaurantId}`);
};