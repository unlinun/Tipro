import React from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/authSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { loginAuth } from "../../api/auth.js";
import { useState } from "react";
import { useEffect } from "react";

// Login component
const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigator = useNavigate();
  // 使用 yup 來創建 form schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Wrong email format")
      .required("Please provide email"),
    password: yup.string().required("Please provide password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  // 登入取得使用者資料
  const login = async (data, e) => {
    try {
      const loginData = await loginAuth(data.email, data.password);
      // 如果登入成功，即可取得 token，並將 token 儲存於 redux 當中以便後續使用
      if (loginData) {
        dispatch(
          setLogin({
            user: loginData.user,
            token: loginData.token,
          })
        );
        navigator("/");
      }
    } catch (error) {
      setErrorMsg("Incorrect email & password, please try again!");
    }
  };

  // 顯示 error message, 並在 3 秒之後清空
  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  }, [errorMsg]);

  return (
    <div className="login">
      <h2>Login</h2>
      <form className="form" id="form" onSubmit={handleSubmit(login)}>
        <div className="form__item">
          <label className="form__label">Email*</label>
          <input
            type="text"
            name="email"
            className="form__input"
            placeholder="example@example.com"
            {...register("email")}
          />
          <p className="form__alert form__alert--error">
            {errors?.email?.message}
          </p>
        </div>
        <div className="form__item">
          <label className="form__label">Password*</label>
          <input
            type="password"
            name="password"
            className="form__input"
            placeholder="at least 6 character"
            {...register("password")}
          />
          <p className="form__alert form__alert--error">
            {errors?.password?.message}
          </p>
        </div>
        <p className="form__alert form__alert--error">{errorMsg}</p>
        <div className="form__submit">
          <button className="form__submit__btn" type="submit" form="form">
            Continue Login
          </button>
          <p>
            Try TiPro for free? <Link to="/home/register">Sign up here!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
