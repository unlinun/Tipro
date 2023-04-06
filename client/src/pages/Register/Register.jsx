import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAuth } from "../../api/auth.js";

const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Username cannot less than 3 words")
      .max(10, "Username cannot over 10 words")
      .required("Please provide username"),
    companyID: yup.string().max(20, "CompanyID cannot over 20 words"),
    birthday: yup
      .date()
      .typeError("Expected a value of type date")
      .required("Please provide date"),
    email: yup
      .string()
      .email("Wrong email format")
      .required("Please provide email"),
    password: yup
      .string()
      .matches(/^\S*$/, "Whitespace is not allowed")
      .min(8, "Password cannot less than 8 words")
      .max(20, "Password cannot over 20 words")
      .required("Please provide password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  // 顯示 error message, 並在 3 秒之後清空
  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  }, [errorMsg]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerUser = async (data) => {
    try {
      const regData = await registerAuth(data);
      if (regData.status === 201) {
        window.alert("sign up success");
        navigate("/login");
      } else {
        setErrorMsg("register fail");
      }
    } catch (error) {
      setErrorMsg(error.message);
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
          <label className="form__label">{`CompanyID (optional)`}</label>
          <input
            type="text"
            name="companyID"
            className="form__input"
            placeholder="default value is Tipro"
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
            max="2012-12-31"
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
            placeholder="at least 8 character"
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
            placeholder="at least 8 character"
            {...register("confirmPassword")}
          />
          <p className="form__alert form__alert--error">
            {errors?.confirmPassword?.message}
          </p>
        </div>
        <div className="form__submit">
          <input
            className="btn btn--form"
            type="submit"
            value="Create my account"
          />
          <p>
            Have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
