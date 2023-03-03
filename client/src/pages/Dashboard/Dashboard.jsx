import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaffs } from "../../api/user";
import { setStaffs } from "../../state/authSlice";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { data } = useQuery("staffs", () => getAllStaffs(user, token));
  if (data) dispatch(setStaffs(data));
  return <div>Dashboard</div>;
};

export default Dashboard;
