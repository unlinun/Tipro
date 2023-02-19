import axios from "axios";
const API_URL = "http://localhost:6001";

export const createPhase = async (phase, token) => {
  const res = await axios.post(`${API_URL}/phase`, phase, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
