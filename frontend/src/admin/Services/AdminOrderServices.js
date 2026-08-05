import axios from "axios";

const API = "http://localhost:5000/api/orders";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getAllOrders = async () => {
  const res = await axios.get(API, getConfig());
  return res.data.orders;
};

export const updateOrderStatus = async (id, status) => {
  const res = await axios.put(
    `${API}/${id}/status`,
    { status },
    getConfig()
  );

  return res.data;
};