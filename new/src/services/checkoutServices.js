import axios from "axios";

const API = "http://localhost:5000/api/checkout";

export const placeOrder = (data) => axios.post(API, data);