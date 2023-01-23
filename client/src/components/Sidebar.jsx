import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  CardTick,
  CategoryIcon,
  TaskIcon,
  TimerIcon,
  SettingIcon,
  UserSquareIcon,
  ChartCircleIcon,
  LeftArrowIcon,
} from "../assets/icons";

const Sidebar = () => {
  return (
    <aside className="sidebar sidebar--narrow">
      <div className="sidebar__user user">
        <img src="{logo}" alt="user" className="user__img" />
        <div className="user__info">
          <h5>user</h5>
          <p>user user user</p>
        </div>
      </div>
      <div className="sidebar__menu menu">
        {/* <div className="menu__arrow ">
          <LeftArrowIcon />
        </div> */}
        <NavLink to="dashboard">
          <CategoryIcon />
          <h6> dashboard</h6>
        </NavLink>
        <NavLink to="timer">
          <TimerIcon />
          <h6> time manage</h6>
        </NavLink>
        <NavLink to="projects">
          <CardTick />
          <h6> projects</h6>
        </NavLink>
        <NavLink to="tasks">
          <TaskIcon />
          <h6> tasks</h6>
        </NavLink>
        <NavLink to="clients">
          <UserSquareIcon />
          <h6> clients</h6>
        </NavLink>
        <NavLink to="reports">
          <ChartCircleIcon />
          <h6> reports</h6>
        </NavLink>
        <NavLink to="setting">
          <SettingIcon />
          <h6> setting</h6>
        </NavLink>
      </div>
      <div className="sidebar__footer footer">
        <Link to="/home/login">logout</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
