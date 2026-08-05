import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/admin/settings`;

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getSettings = async () => {
  const res = await axios.get(API, getAuthConfig());
  return res.data;
};

export const updateSettings = async (data) => {
  const res = await axios.put(API, data, getAuthConfig());
  return res.data;
};