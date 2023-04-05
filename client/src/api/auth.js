import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

export const registerAuth = async (data) => {
  return axios
    .post(`${API_URL}/auth/register`, {
      username: data.username,
      birthday: data.birthday,
      email: data.email,
      password: data.password,
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
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw new Error("wrong email or password");
  }
};
