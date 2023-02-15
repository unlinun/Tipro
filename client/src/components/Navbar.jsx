import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  // 找到現在的 url pathname
  const location = useLocation();
  const currentURL = location.pathname;

  return (
    <nav className="nav flex flex--bt mg__b--20">
      <Link to="/home">
        <img className="logo nav__logo" src={logo} alt="TiPro-logo" />
      </Link>
      {currentURL === "/home" ? (
        <div className="nav__menu flex gap--20">
          <Link to="login" className="link">
            login
          </Link>
          <Link to="register" className="link">
            sign up
          </Link>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
