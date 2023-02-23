import axios from "axios";
const API_URL = "http://localhost:6001";

export const getAllStaffs = async (user, token) => {
  const res = await axios.get(`${API_URL}/staffs/${user.companyID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = res.data;
  return data;
};
