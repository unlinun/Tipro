import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  return <div>Dashboard</div>;
};

export default Dashboard;
