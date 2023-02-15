import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Home = () => {
  return (
    <main className="main flex flex--bt">
      <div className="main__intro intro flex__col">
        <div className="intro__content">
          <h1>Time & Project control</h1>
          <h3>Keep track your Time</h3>
          <h3>Keep track your project</h3>
        </div>
        <Link to="register">
          <button className="btn btn--home">Try TiPro Now</button>
        </Link>
      </div>
      <div className="main__image flex flex--cen">
        <img src={logo} alt="logo" />
      </div>
    </main>
  );
};

export default Home;
