import { StatusCodes } from "http-status-codes";

import Projects from "../models/Projects.js";
import Task from "../models/Task.js";
import Memo from "../models/Memo.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  const user = req.user;
  const now = new Date(new Date().toLocaleDateString());
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );

  const endToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  const userCompany = await User.findOne({ _id: user.id });
  const projects = await Projects.find({
    $or: [{ manager: user.id }, { createdBy: user.id }, { staff: user.id }],
    status: "in progress",
  });
  const tasks = await Task.find({
    createdBy: user.id,
    startDate: { $gte: today, $lte: endToday },
  });
  const memo = await Memo.findOne({
    createdBy: user.id,
    createdAt: { $gte: today, $lte: endToday },
  });
  const staffs = await User.find(
    { companyID: userCompany.companyID },
    { password: 0 }
  );

  res.status(StatusCodes.OK).json({ projects, tasks, memo, staffs });
};
