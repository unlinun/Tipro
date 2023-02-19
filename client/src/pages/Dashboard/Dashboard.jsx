import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaffs } from "../../api/company";
import { setStaffs } from "../../state/authSlice";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { data } = useQuery("staffs", () => getAllStaffs(token));
  if (data) dispatch(setStaffs(data));

  return <div>Dashboard</div>;
};

export default Dashboard;
