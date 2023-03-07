import { StatusCodes } from "http-status-codes";
import Timer from "../models/Timer.js";

// 根據 task id 來取得相對應的 timer
export const getTimer = async (req, res) => {
  const { day } = req.query;
  const startDate = new Date(day);
  const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const timer = await Timer.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "taskId",
        foreignField: "_id",
        as: "task",
        pipeline: [
          {
            $project: { title: 1, finished: 1, startDate: 1 },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "projectId",
        foreignField: "_id",
        as: "project",
        pipeline: [
          {
            $project: { title: 1 },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "phaseId",
        foreignField: "phase._id",
        as: "phase",
      },
    },
    {
      $match: {
        weekStartDate: { $gt: startDate, $lt: endDate },
      },
    },
    {
      $addFields: {
        task: { $arrayElemAt: ["$task", 0] },
        project: { $arrayElemAt: ["$project", 0] },
      },
    },
    {
      $set: {
        phase: { $arrayElemAt: ["$phase.phase", 0] },
      },
    },
  ]);
  if (!timer) {
    throw new NotFoundError("No timer found!");
  }
  res.status(StatusCodes.OK).json(timer);
};

export const createTimer = async (req, res) => {
  const timer = await Timer.create(req.body);
  res.status(StatusCodes.CREATED).json(timer);
};

export const updateTimer = async (req, res) => {
  const { id } = req.body;
  const timer = await Timer.findOneAndUpdate({});
  res.status(StatusCodes.CREATED).json(timer);
};
