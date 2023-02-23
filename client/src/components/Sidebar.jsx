import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CardTick,
  CategoryIcon,
  TaskIcon,
  TimerIcon,
  SettingIcon,
  UserSquareIcon,
  ChartCircleIcon,
} from "../assets/icons";
import { setLogout } from "../state/authSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <aside className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__user user">
          <img
            src={`http://localhost:6001/${user?.avatar}`}
            alt="user"
            className="user__img"
          />
          <div className="user__info">
            <h5>{user?.username}</h5>
            <p>{user?.position}</p>
          </div>
        </div>
        <div className="sidebar__menu menu">
          <NavLink to="/">
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
          <NavLink to="staffs">
            <UserSquareIcon />
            <h6> staffs</h6>
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
          <Link to="/home/login" onClick={() => dispatch(setLogout())}>
            logout
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
