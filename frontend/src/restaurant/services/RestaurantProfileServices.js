import axios from "axios";

const API = "http://localhost:5000/api/restaurant";

const getAuthConfig = (isFormData = false) => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("restaurantToken")}`,
    ...(isFormData && {
      "Content-Type": "multipart/form-data",
    }),
  },
});

export const getProfile = async () => {
  const res = await axios.get(
    `${API}/profile`,
    getAuthConfig()
  );

  return res.data;
};

export const updateProfile = async (data) => {
  console.log("restaurantToken:", localStorage.getItem("restaurantToken"));

  const res = await axios.put(
    `${API}/profile`,
    data,
    getAuthConfig(true)
  );

  return res.data;
};