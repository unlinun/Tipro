import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Navigator } from "./Navigator";
import { useState } from "react";

const ShareSidebarNav = () => {
  //控制 sidebar 縮小或是放大
  const [sideClose, setSideClose] = useState(false);
  return (
    <div className={`container ${sideClose ? "container--close" : ""}`}>
      <Sidebar />
      <div className="content">
        <div
          className="content__toggle"
          onClick={() => setSideClose(!sideClose)}
        ></div>
        <Navigator />
        <Outlet />
      </div>
    </div>
  );
};

export default ShareSidebarNav;
