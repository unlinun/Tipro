import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <form className="form">
        <div className="form__item">
          <label className="form__label">Email*</label>
          <input
            type="text"
            name="email"
            className="form__input"
            placeholder="example@example.com"
          />
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <label className="form__label">Password*</label>
          <input
            type="password"
            name="password"
            className="form__input"
            placeholder="at least 6 character"
          />
          <p className="form__alert"></p>
        </div>
        <div className="form__submit">
          <input
            className="form__submit__btn"
            type="submit"
            value="Continue Login"
          />
          <p>
            Try TiPro for free? <Link to="/register">Sign up here!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
