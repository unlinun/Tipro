import axios from "axios";
const API_URL = "http://localhost:6001";

export const getAllProjects = async (token) => {
  try {
    return await axios
      .get(`${API_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data;
      });
  } catch (error) {
    console.log(error);
  }
};
