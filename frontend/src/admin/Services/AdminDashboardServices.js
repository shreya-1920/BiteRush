import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/admin/dashboard`;

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getDashboardStats = async () => {
  const res = await axios.get(API, getAuthConfig());
  return res.data;
};