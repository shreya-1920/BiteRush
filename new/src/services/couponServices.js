import axios from "axios";

const API = "http://localhost:5000/api/coupons";

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