import axios from "axios";
const API_URL = "http://localhost:6001";

export const registerAuth = async (data) => {
  axios
    .post("http://localhost:6001/auth/register", {
      username: data.username,
      birthday: data.birthday,
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      if (res.status === 201) {
        window.alert("Sign up success!");
      } else {
        throw new Error("register fail");
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const loginAuth = async (email, password) => {
  return await axios
    .post(
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
    )
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      } else {
        throw new Error("login fail");
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
