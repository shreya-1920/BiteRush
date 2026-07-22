import axios from "axios";

const API = "http://localhost:5000/api/admin/customers";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getAllCustomers = async () => {
  const res = await axios.get(API, getConfig());
  return res.data;
};

export const getCustomer = async (id) => {
  const res = await axios.get(`${API}/${id}`, getConfig());
  return res.data;
};

export const toggleBlockCustomer = async (id) => {
  const res = await axios.patch(`${API}/${id}/block`, {}, getConfig());
  return res.data;
};

export const deleteCustomer = async (id) => {
  const res = await axios.delete(`${API}/${id}`, getConfig());
  return res.data;
};