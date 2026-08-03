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
export const getOrderById = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.order;
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

export const reorderOrder = async (orderId) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/reorder/${orderId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};