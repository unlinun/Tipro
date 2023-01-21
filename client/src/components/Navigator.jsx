import React from "react";
import { SearchIcon, AddIcon } from "../assets/icons";
import logo from "../assets/logo.png";

export const Navigator = () => {
  return (
    <nav className="navigator">
      <div className="navigator__search">
        <SearchIcon />
        <input type="text" />
      </div>
      <div className="navigator__add">
        <p>New Task</p>
        <AddIcon />
      </div>
      <div className="navigator__info info">
        <div className="info__time">
          <h6>
            01<span>/</span>04
          </h6>
          <h6>MON</h6>
          <h6>15:00</h6>
        </div>
        <img className="info__user" src={logo} alt="logo" />
        <div className="info__mode">
          <div className="toggle">
            <input
              type="radio"
              className="toggle__dark"
              id="toggle__dark"
              name="toggle"
            />
            <input
              type="radio"
              className="toggle__light"
              id="toggle__light"
              name="toggle"
            />
            <div className="toggle__switcher"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};
