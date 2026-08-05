import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/coupons`;

export const getAvailableCoupons = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const applyCoupon = async (code, subtotal) => {
  const res = await axios.post(`${API}/apply`, {
    code,
    subtotal,
  });

  return res.data;
};