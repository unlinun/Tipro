import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/notFound.js";
import BadRequestError from "../errors/badRequest.js";
import mongoose from "mongoose";
import Projects from "../models/Projects.js";
import Task from "../models/Task.js";
import Memo from "../models/Memo.js";
import User from "../models/User.js";
import { getWeekEndDate, getWeekStartDate } from "../helper/date.js";

export const getDashboard = async (req, res) => {
  const user = req.user;
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const endToday = new Date(new Date().setHours(23, 59, 59, 59));
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
