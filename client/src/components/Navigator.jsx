import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { SearchIcon, AddIcon, SunIcon } from "../assets/icons";
import dateFormat from "dateformat";
import { setMode } from "../state/authSlice";
import ProjectForm from "./ProjectForm";

export const Navigator = () => {
  // 找到現在的 url pathname
  const location = useLocation();
  const currentURL = location.pathname;
  const dispatch = useDispatch();

  // 取得現在的時間點
  const [date, setDate] = useState(new Date());
  const weekDay = dateFormat(date, "ddd");
  const time = dateFormat(date, "shortTime");
  const day = dateFormat(date, "dd");
  const month = dateFormat(date, "mm");

  // 使用 useEffect 並且使用 setInterval
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 10000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

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
      <div className="navigator__form">
        <ProjectForm />
      </div>
      <div className="navigator__info info">
        <div className="info__time">
          <h6>
            {month}
            <span>/</span>
            {day}
          </h6>
          <h6>{weekDay}</h6>
          <h6>{time}</h6>
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
