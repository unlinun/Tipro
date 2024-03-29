import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

export const getDashboard = async (token) => {
  const res = await axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
