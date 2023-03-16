import axios from "axios";
const API_URL = "http://localhost:6001";

export const createMemo = async (memo, token) => {
  const res = await axios.post(`${API_URL}/memo`, memo, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const updateMemo = async (memo, token) => {
  if (memo.content === "") return;
  const res = await axios.patch(`${API_URL}/memo/${memo._id}`, memo, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};