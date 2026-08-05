import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Register
export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Login
export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

// Get Logged-in User Profile
export const getProfile = async () => {
  return axios.get(`${API_URL}/profile`, getAuthConfig());
};

// Update Logged-in User Profile
export const updateProfile = async (userData) => {
  return axios.put(
    `${API_URL}/profile`,
    userData,
    getAuthConfig()
  );
};

// Logout
export const logoutUser = async () => {
  return axios.get(`${API_URL}/logout`);
};

// Forgot Password
export const forgotPassword = async (data) => {
  return axios.post(`${API_URL}/forgotpassword`, data);
};

// Reset Password
export const resetPassword = async ({ token, password }) => {
  return axios.post(
    `${API_URL}/resetpassword/${token}`,
    {
      password,
    }
  );
};