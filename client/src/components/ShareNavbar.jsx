import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ShareNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ShareNavbar;
