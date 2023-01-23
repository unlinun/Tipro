import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Navigator } from "./Navigator";

const ShareSidebarNav = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Navigator />
        <Outlet />
      </div>
    </div>
  );
};

export default ShareSidebarNav;
