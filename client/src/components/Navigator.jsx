import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import dateFormat from "dateformat";

import avatar from "../assets/avatar.svg";
import { SearchIcon, AddIcon, SunIcon } from "../assets/icons";
import { setMode, setCreating, setForm } from "../state/authSlice";
import ProjectForm from "./ProjectForm";
import { getAllProjects } from "../api/projects";
import TaskFrom from "./TaskFrom";

export const Navigator = () => {
  // 找到現在的 url pathname
  const location = useLocation();
  const currentURL = location.pathname;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const createForm = useSelector((state) => state.auth.form);
  const { data: projects } = useQuery("projects", () => getAllProjects(token));

  // 取得現在的時間點
  const [date, setDate] = useState(new Date());
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  // const [createForm, setCreateForm] = useState("");
  const isCreating = useSelector((state) => state.auth.creating);
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

  const handleCreate = (form) => {
    dispatch(setCreating());
    dispatch(setForm({ form }));
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    if (!searchValue) setSearchData([]);
    const searchProject = projects.projects.filter((item) => {
      return (
        item.title.includes(value) ||
        item.location.country.toLowerCase().includes(value) ||
        item.location.city.toLowerCase().includes(value) ||
        item.description.includes(value) ||
        item.businessOwner.includes(value)
      );
    });
    setSearchData(searchProject);
  };

  return (
    <nav className="navigator">
      <div className="navigator__search" onChange={(e) => handleSearch(e)}>
        <div className="wrapper">
          <SearchIcon />
          <input type="text" placeholder="search project" />
        </div>
      </div>
      {searchValue ? (
        <div className="navigator__search__content">
          {searchData.length > 0 ? (
            searchData?.map((item, i) => {
              return (
                <Link
                  className="search__item"
                  to={`/projects/${item._id}`}
                  key={item._id}
                  onClick={() => {
                    setSearchValue("");
                    setSearchData([]);
                  }}
                >
                  <div className="item">{i + 1}</div>
                  <div className="item">
                    {reactStringReplace(
                      `${item.title}`,
                      `${searchValue}`,
                      (match, i) => (
                        <span key={i} className="item__highlight">
                          {match}
                        </span>
                      )
                    )}
                  </div>
                  <div className="item item--description">
                    {reactStringReplace(
                      `${item.description}`,
                      `${searchValue}`,
                      (match, i) => (
                        <span key={i} className="item__highlight">
                          {match}
                        </span>
                      )
                    )}
                  </div>
                  <div className="item__businessOwner">
                    {reactStringReplace(
                      `${item.businessOwner}`,
                      `${searchValue}`,
                      (match, i) => (
                        <span key={i} className="item__highlight">
                          {match}
                        </span>
                      )
                    )}
                  </div>
                  <div className="item"></div>
                </Link>
              );
            })
          ) : (
            <div className="search__item">
              <p className="item__empty">no results found</p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      {/* 新增 task 還是 project */}
      {currentURL.startsWith("/projects") ? (
        <div className="navigator__add" onClick={() => handleCreate("project")}>
          <p>New Project</p>
          <AddIcon />
        </div>
      ) : (
        <div className="navigator__add" onClick={() => handleCreate("task")}>
          <p>New Task</p>
          <AddIcon />
        </div>
      )}
      {isCreating ? (
        <div className="navigator__form">
          <div
            className="navigator__overlay"
            onClick={() => {
              dispatch(setForm({ form: null }));
              dispatch(setCreating());
            }}
          ></div>
          {createForm === "project" ? <ProjectForm /> : <TaskFrom />}
        </div>
      ) : (
        ""
      )}
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
        <img className="info__user" src={avatar} alt="logo" />
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
