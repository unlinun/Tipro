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
  MemoIcon,
} from "../assets/icons";
import { setLogout } from "../state/authSlice";
const API_URL = process.env.REACT_APP_BASE_URL;

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <aside className="sidebar">
      <div className="sidebar__wrapper">
        <Link to="setting" className="sidebar__user user">
          <img
            src={`${API_URL}/${user?.avatar}`}
            alt="user"
            className="user__img"
          />
          <div className="user__info">
            <h5>{user?.username}</h5>
            <p>{user?.position}</p>
          </div>
        </Link>
        <div className="sidebar__menu menu">
          <NavLink to="dashboard">
            <CategoryIcon />
            <h6> dashboard</h6>
          </NavLink>
          <NavLink to="projects">
            <CardTick />
            <h6> projects</h6>
          </NavLink>
          <NavLink to="tasks">
            <TaskIcon />
            <h6> tasks</h6>
          </NavLink>
          <NavLink to="timer">
            <TimerIcon />
            <h6> time manage</h6>
          </NavLink>
          <NavLink to="memos">
            <MemoIcon />
            <h6> memos</h6>
          </NavLink>
          <NavLink to="staffs">
            <UserSquareIcon />
            <h6> staffs</h6>
          </NavLink>
          <NavLink to="setting">
            <SettingIcon />
            <h6> setting</h6>
          </NavLink>
        </div>
        <div className="sidebar__footer footer">
          <Link to="/login" onClick={() => dispatch(setLogout())}>
            logout
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
