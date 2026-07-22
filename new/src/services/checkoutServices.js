import axios from "axios";

const API = "http://localhost:5000/api/orders";

export const placeOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(API, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.orders;
};