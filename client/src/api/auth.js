import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

export const registerAuth = async (data) => {
  return axios
    .post(`${API_URL}/auth/register`, {
      username: data.username,
      birthday: data.birthday,
      email: data.email,
      password: data.password,
      companyID: data.companyID,
    })
    .then((res) => {
      if (res.status === 201) {
        return res;
      } else {
        throw new Error("register fail");
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const loginAuth = async (email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    if (error.response) {
      if (error.response?.data.error === "Invalid Credential")
        // 網路請求成功，但是後端回應 HTTP 狀態碼為錯誤
        throw new Error("wrong email or password");
    } else {
      throw new Error("Oops, network error");
    }
  }
};
