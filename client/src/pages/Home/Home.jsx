import React from "react";
import { Link } from "react-router-dom";
import video from "../../assets/Tipro.mp4";

const Home = () => {
  return (
    <>
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
        <div className="main__video flex flex--cen">
          <video className="video" controls autoPlay muted>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>
      <footer className="main__footer">
        created by
        <a
          target="_blank"
          href="https://github.com/unlinun/Tipro"
          rel="noreferrer"
        >
          UNLIN
        </a>
        2023
      </footer>
    </>
  );
};

export default Home;
