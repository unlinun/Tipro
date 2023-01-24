import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Navigator } from "./Navigator";

const ShareSidebarNav = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <div className="content__toggle"></div>
        <Navigator />
        <Outlet />
      </div>
    </div>
  );
};

export default ShareSidebarNav;
