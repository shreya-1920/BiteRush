import axios from "axios";

const API = "http://localhost:5000/api/admin/messages";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getAllMessages = async () => {
  const res = await axios.get(API, getAuthConfig());
  return res.data;
};

export const getMessage = async (id) => {
  const res = await axios.get(`${API}/${id}`, getAuthConfig());
  return res.data;
};

export const deleteMessage = async (id) => {
  const res = await axios.delete(`${API}/${id}`, getAuthConfig());
  return res.data;
};