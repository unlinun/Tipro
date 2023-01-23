import React from "react";
import { SearchIcon, AddIcon, SunIcon } from "../assets/icons";

export const Navigator = () => {
  return (
    <nav className="navigator">
      <div className="navigator__search">
        <div className="wrapper">
          <SearchIcon />
          <input type="text" />
        </div>
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
        <img className="info__user" src="" alt="logo" />
        <div className="info__mode">
          <div className="toggle">
            <input
              type="radio"
              className="toggle__dark"
              id="dark"
              name="toggle"
            />
            <input
              type="radio"
              className="toggle__light"
              id="light"
              name="toggle"
            />
            <div className="toggle__switcher"></div>
          </div>
          <SunIcon />
        </div>
      </div>
    </nav>
  );
};
