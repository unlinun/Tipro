import axios from "axios";
const API_URL = "http://localhost:6001";

export const getAllStaffs = async (user, token) => {
  const res = await axios.get(`${API_URL}/user/?id=${user.companyID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = res.data;
  return data;
};

export const getUser = async (user, token) => {
  const res = await axios.get(`${API_URL}/user/${user._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data;
};

export const updateUser = async (user, token) => {
  const userId = user.get("_id");
  const res = await axios.patch(`${API_URL}/user/${userId}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
  const data = res.data;
  return data;
};
