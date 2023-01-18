import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Home = () => {
  return (
    <main className="main">
      <div className="main__intro">
        <div className="content">
          <h1>Time & Project control</h1>
          <h3>Keep track your Time</h3>
          <h3>Keep track your project</h3>
        </div>
        <Link to="/register">
          <button className="content__btn">Try TiPro Now</button>
        </Link>
      </div>
      <div className="main__image">
        <img src={logo} alt="" />
      </div>
    </main>
  );
};

export default Home;
