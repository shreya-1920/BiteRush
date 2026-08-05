import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/restaurant`;

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("restaurantToken")}`,
  },
});

export const getMenu = async () => {
  const res = await axios.get(`${API}/menu`, getAuthConfig());
  return res.data;
};

export const addDish = async (formData) => {
  const res = await axios.post(`${API}/menu`, formData, getAuthConfig());
  return res.data;
};

export const updateDish = async (id, formData) => {
  const res = await axios.put(
    `${API}/menu/${id}`,
    formData,
    getAuthConfig()
  );
  return res.data;
};

export const deleteDish = async (id) => {
  const res = await axios.delete(
    `${API}/menu/${id}`,
    getAuthConfig()
  );
  return res.data;
};

export const toggleDishStatus = async (id) => {
  const res = await axios.patch(
    `${API}/menu/${id}/status`,
    {},
    getAuthConfig()
  );
  return res.data;
};