import axios from "axios";

const API = "http://localhost:5000/api/admin/coupons";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getAllCoupons = async () => {
  const res = await axios.get(API, getConfig());
  return res.data;
};

export const getCoupon = async (id) => {
  const res = await axios.get(`${API}/${id}`, getConfig());
  return res.data;
};

export const createCoupon = async (couponData) => {
  const res = await axios.post(API, couponData, getConfig());
  return res.data;
};

export const updateCoupon = async (id, couponData) => {
  const res = await axios.put(`${API}/${id}`, couponData, getConfig());
  return res.data;
};

export const toggleCoupon = async (id) => {
  const res = await axios.patch(`${API}/${id}/toggle`, {}, getConfig());
  return res.data;
};

export const deleteCoupon = async (id) => {
  const res = await axios.delete(`${API}/${id}`, getConfig());
  return res.data;
};