import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const loginAdmin = async (adminData) => {
  const response = await axios.post(`${API_URL}/login`, adminData);

  if (response.data.token) {
    localStorage.setItem("adminToken", response.data.token);
    localStorage.setItem("admin", JSON.stringify(response.data.admin));
  }

  return response.data;
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("admin");
};

export const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};