import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import dateFormat from "dateformat";
import { SearchIcon, AddIcon, SunIcon } from "../assets/icons";
import { setMode, setCreating, setForm } from "../state/authSlice";
import ProjectForm from "./ProjectForm";
import TaskFrom from "./TaskFrom";
import { getAllProjects } from "../api/projects";

export const Navigator = () => {
  // 找到現在的 url pathname
  const location = useLocation();
  const currentURL = location.pathname;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

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
        item.title.toLowerCase().includes(value) ||
        item.location.country.toLowerCase().includes(value) ||
        item.location.city.toLowerCase().includes(value) ||
        item.description.includes(value) ||
        item.businessOwner.includes(value)
      );
    });
    setSearchData(searchProject);
  };

  return (
    <nav className="navigator flex flex--bt pd__topleft--816 mg__b--20">
      <div
        className="navigator__search search"
        onChange={(e) => handleSearch(e)}
      >
        <div className="search__wrapper flex gap--8 pd--8">
          <SearchIcon />
          <input type="text" placeholder="search project" />
        </div>
      </div>
      {searchValue ? (
        <div className="search__content flex flex__col gap--8 pd--10">
          {searchData.length > 0 ? (
            searchData?.map((item, i) => {
              return (
                <Link
                  className="search__items grid grid--cc pd--8"
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
                        <span key={i} className="search__highlight">
                          {match}
                        </span>
                      )
                    )}
                  </div>
                  <div className="item text--ellipsis">
                    {reactStringReplace(
                      `${item.description}`,
                      `${searchValue}`,
                      (match, i) => (
                        <span key={i} className="search__highlight">
                          {match}
                        </span>
                      )
                    )}
                  </div>
                  <div className="item">
                    {reactStringReplace(
                      `${item.businessOwner}`,
                      `${searchValue}`,
                      (match, i) => (
                        <span key={i} className="search__highlight">
                          {match}
                        </span>
                      )
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="search__items grid grid--cc pd--8">
              <p className="search__empty">no results found</p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      {/* 新增 task 還是 project */}
      {currentURL.startsWith("/projects") ? (
        <div
          className="navigator__btn btn btn--nav"
          onClick={() => handleCreate("project")}
        >
          <p>New Project</p>
          <AddIcon />
        </div>
      ) : (
        <div
          className="navigator__btn btn btn--nav"
          onClick={() => handleCreate("task")}
        >
          <p>New Task</p>
          <AddIcon />
        </div>
      )}
      {isCreating ? (
        <div className="navigator__form">
          <div
            className="navigator__overlay overlay"
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
      <div className="navigator__info flex flex--bt gap--20">
        <div className="flex gap--16">
          <h6>
            {month}
            <span>/</span>
            {day}
          </h6>
          <h6>{weekDay}</h6>
          <h6>{time}</h6>
        </div>
        <img
          className="navigator__user"
          src={`http://localhost:6001/${user?.avatar}`}
          alt="user"
        />
        <div className="navigator__mode flex gap--8">
          <div className="toggle">
            <input
              type="radio"
              className="dark"
              id="dark"
              name="toggle"
              checked={mode === "dark" ? true : false}
              onChange={() => dispatch(setMode("dark"))}
            />
            <input
              type="radio"
              className="light"
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
