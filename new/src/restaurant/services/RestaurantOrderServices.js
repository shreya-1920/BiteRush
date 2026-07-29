import axios from "axios";

const API = "http://localhost:5000/api/restaurant";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("restaurantToken")}`,
  },
});

export const getOrders = async () => {
  const res = await axios.get(
    `${API}/orders`,
    getAuthConfig()
  );

  return res.data;
};

export const getOrder = async (id) => {
  const res = await axios.get(
    `${API}/orders/${id}`,
    getAuthConfig()
  );

  return res.data;
};

export const updateStatus = async (id, status) => {
  const res = await axios.patch(
    `${API}/orders/${id}/status`,
    { status },
    getAuthConfig()
  );

  return res.data;
};