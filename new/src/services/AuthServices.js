import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export const logoutUser = async () => {
  return axios.get(`${API_URL}/logout`);
};

export const forgotPassword = async (data) => {
  return axios.post(`${API_URL}/forgotpassword`, data);
};

export const resetPassword = async ({ token, password }) => {
  return axios.post(
    `${API_URL}/resetpassword/${token}`,
    {
      password,
    }
  );
};