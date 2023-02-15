import axios from "axios";
const API_URL = "http://localhost:6001";

export const getAllTasks = async (token) => {};
export const getAllTasksByUser = async (token) => {
  const res = await axios.get(`${API_URL}/tasks/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};

export const createTask = async (task, token) => {
  const res = await axios.post(`${API_URL}/tasks`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};
