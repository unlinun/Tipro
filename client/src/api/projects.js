import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

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

export const createProject = async (project, token) => {
  const res = await axios.post(`${API_URL}/projects`, project, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateProject = async (project, token) => {
  if (project.title === "" || project.description === "") return;
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

//  取得country API
export const getCountry = async () => {
  return await axios
    .get("https://countriesnow.space/api/v0.1/countries")
    .then((res) => {
      return res.data.data;
    });
};
