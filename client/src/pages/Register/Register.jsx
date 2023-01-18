import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <h2>Sign up</h2>
      <form className="form">
        <div className="form__item">
          <label className="form__label">Username*</label>
          <input
            type="text"
            name="username"
            className="form__input"
            placeholder="your username"
          />
          <p className="form__alert"></p>
        </div>
        <div className="form__item">
          <label className="form__label">CompanyID</label>
          <input
            type="text"
            name="companyID"
            className="form__input"
            placeholder="company id"
          />
          <p className="form__alert"></p>
        </div>
        <div className="form__item">
          <label className="form__label">Birthday*</label>
          <input type="date" name="birthday" className="form__input" />
          <p className="form__alert"></p>
        </div>
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
        <div className="form__item">
          <label className="form__label">ConfirmPassword*</label>
          <input
            type="password"
            name="confirmPassword"
            className="form__input"
            placeholder="at least 6 character"
          />
          <p className="form__alert"></p>
        </div>
        <div className="form__submit">
          <input
            className="form__submit__btn"
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
