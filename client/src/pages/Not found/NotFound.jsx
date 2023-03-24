import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NotFound = () => {
  return (
    <main className="main flex flex--bt">
      <div className="main__intro intro flex__col">
        <div className="intro__content">
          <p style={{ fontSize: "60px", fontW: "600" }}>404</p>
          <h3>Oops! Page not found!</h3>
        </div>
        <Link to="home">
          <button className="btn btn--404">Back to home</button>
        </Link>
      </div>
      <div className="main__image flex flex--cen">
        <img src={logo} alt="logo" />
      </div>
    </main>
  );
};

export default NotFound;
