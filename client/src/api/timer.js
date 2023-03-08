import axios from "axios";
const API_URL = "http://localhost:6001";

export const getTimer = async (weekDate, token) => {
  // 取得要查找的日期
  const res = await axios.get(`${API_URL}/timer/?day=${weekDate}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};
export const updateTimer = async (timer, token) => {
  // 取得要查找的日期
  const res = await axios.patch(`${API_URL}/timer/${timer._id}`, timer, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};
