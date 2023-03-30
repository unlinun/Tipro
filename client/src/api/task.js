import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

export const getAllTasks = async (token) => {
  const res = await axios.get(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};

// 取得使用者創建的任務
export const getAllTasksByUser = async (id, token) => {
  const res = await axios.get(`${API_URL}/tasks?user=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};

// 取得相同 project 創建的任務
export const getAllTasksFromProject = async (id, token) => {
  const res = await axios.get(`${API_URL}/tasks?project=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};

export const createTask = async (task, token) => {
  console.log(task);
  const res = await axios.post(`${API_URL}/tasks`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateTask = async (task, token) => {
  if (task.title === "" || task.startDate === "") return;
  const res = await axios.patch(`${API_URL}/tasks/${task._id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};

export const deleteTask = async (task, token) => {
  const res = await axios.delete(`${API_URL}/tasks/${task._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};
