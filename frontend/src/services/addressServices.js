import axios from "axios";

const API_URL = "http://localhost:5000/api/address";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Save Address
export const saveAddress = async (addressData) => {
  return axios.post(API_URL, addressData, getAuthConfig());
};

// Get All Addresses
export const getAddresses = async () => {
  return axios.get(API_URL, getAuthConfig());
};

// Update Address
export const updateAddress = async (id, addressData) => {
  return axios.put(`${API_URL}/${id}`, addressData, getAuthConfig());
};

// Delete Address
export const deleteAddress = async (id) => {
  return axios.delete(`${API_URL}/${id}`, getAuthConfig());
};