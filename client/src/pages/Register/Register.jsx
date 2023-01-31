import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAuth } from "../../api/auth.js";

const Register = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Username cannot less than 3 words")
      .max(10, "Username cannot over 10 words")
      .required("Please provide username"),
    companyID: yup.string().max(10, "CompanyID cannot over 10 words"),
    birthday: yup.date().required("Please provide date"),
    email: yup
      .string()
      .email("Wrong email format")
      .required("Please provide email"),
    password: yup
      .string()
      .min(8, "Password cannot less than 8 words")
      .max(20, "Password cannot over 20 words")
      .required("Please provide password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerUser = async (data) => {
    try {
      await registerAuth(data);
      navigate("/home/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="register">
      <h2>Sign up</h2>
      <form className="form" onSubmit={handleSubmit(registerUser)}>
        <div className="form__item">
          <label className="form__label">Username*</label>
          <input
            type="text"
            name="username"
            className="form__input"
            placeholder="your username"
            {...register("username")}
          />
          <p className="form__alert form__alert--error">
            {errors?.username?.message}
          </p>
        </div>
        <div className="form__item">
          <label className="form__label">CompanyID</label>
          <input
            type="text"
            name="companyID"
            className="form__input"
            placeholder="company id"
            {...register("companyID")}
          />
          <p className="form__alert form__alert--error">
            {errors?.companyID?.message}
          </p>
        </div>
        <div className="form__item">
          <label className="form__label ">Birthday*</label>
          <input
            type="date"
            name="birthday"
            className="form__input"
            {...register("birthday")}
          />
          <p className="form__alert form__alert--error">
            {errors?.birthday?.message}
          </p>
        </div>
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
        <div className="form__item">
          <label className="form__label">ConfirmPassword*</label>
          <input
            type="password"
            name="confirmPassword"
            className="form__input"
            placeholder="at least 6 character"
            {...register("confirmPassword")}
          />
          <p className="form__alert form__alert--error">
            {errors?.confirmPassword?.message}
          </p>
        </div>
        <div className="form__submit">
          <input
            className="form__submit__btn"
            type="submit"
            value="Create my account"
          />
          <p>
            Have an account? <Link to="/home/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
