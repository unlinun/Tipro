import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { SearchIcon, AddIcon, SunIcon } from "../assets/icons";
import { setMode } from "../state/authSlice";

export const Navigator = () => {
  // 找到現在的 url pathname
  const location = useLocation();
  const currentURL = location.pathname;
  const dispatch = useDispatch();

  // 設定整體顏色模式 (dark and light mode)
  const mode = useSelector((state) => state.auth.mode);
  useEffect(() => {
    document.querySelector("body").dataset.theme = mode;
  }, [mode]);

  return (
    <nav className="navigator">
      <div className="navigator__search">
        <div className="wrapper">
          <SearchIcon />
          <input type="text" />
        </div>
      </div>

      {/* 新增 task 還是 project */}
      {currentURL.startsWith("/projects") ? (
        <div className="navigator__add">
          <p>New Project</p>
          <AddIcon />
        </div>
      ) : (
        <div className="navigator__add">
          <p>New Task</p>
          <AddIcon />
        </div>
      )}

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
              checked={mode === "dark" ? true : false}
              onChange={() => dispatch(setMode("dark"))}
            />
            <input
              type="radio"
              className="toggle__light"
              id="light"
              name="toggle"
              checked={mode === "light" ? true : false}
              onChange={() => dispatch(setMode("light"))}
            />
            <div className="toggle__switcher"></div>
          </div>
          <SunIcon />
        </div>
      </div>
    </nav>
  );
};
