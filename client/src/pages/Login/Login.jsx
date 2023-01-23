import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const Login = () => {
  // form schema
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

  const loginUser = async (data, e) => {
    console.log(data);
    // navigate("/");
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form className="form" id="form" onSubmit={handleSubmit(loginUser)}>
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
