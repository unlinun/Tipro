import axios from "axios";
const API_URL = "http://localhost:6001";

export const getAllProjects = async (token) => {
  const res = await axios.get(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = res.data;
  return data;
};

export const getSingleProject = async (id, token) => {
  const res = await axios.get(`${API_URL}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};

export const updateProject = async (project, token) => {
  const res = await axios.patch(`${API_URL}/projects/${project._id}`, project, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};

export const deleteProject = async (project, token) => {
  const res = await axios.delete(`${API_URL}/projects/${project._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};
