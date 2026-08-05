import axios from "axios";

const API = "http://localhost:5000/api/admin/notifications";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getNotifications = async () => {
  const res = await axios.get(API, getAuthConfig());
  return res.data.notifications;
};

// ADD THIS
export const markAllRead = async () => {
  const res = await axios.patch(
    `${API}/read-all`,
    {},
    getAuthConfig()
  );
  return res.data;
};