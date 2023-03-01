import { StatusCodes } from "http-status-codes";
import Timer from "../models/Timer.js";

// 根據 task id 來取得相對應的 timer
export const getTimerFromTask = async (req, res) => {
  const { id: taskId } = req.id;
  const timer = await Timer.find({ taskId });
  console.log(timer);
};

export const createTimer = async (req, res) => {
  const timer = await Timer.create(req.body);
  res.status(StatusCodes.CREATED).json(timer);
};
