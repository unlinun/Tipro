import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import BadRequestError from "../errors/badRequest.js";
import NotFoundError from "../errors/notFound.js";
import Timer from "../models/Timer.js";

// 根據 task id 來取得相對應的 timer
export const getTimer = async (req, res) => {
  const { day } = req.query;
  const user = req.user;
  const weekStartDate = new Date(day);
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  let queryObject = {};
  if (day) {
    queryObject.dateOfWeek = {
      $gt: new Date(weekStartDate),
      $lt: new Date(weekEndDate),
    };
  }
  const timer = await Timer.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "taskId",
        foreignField: "_id",
        as: "task",
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
            $project: { title: 1, startDate: 1 },
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
      // 符合此週的 timer 才會顯示
      $match: {
        createdBy: mongoose.Types.ObjectId(user.id),
        timeRecord: {
          $elemMatch: queryObject,
        },
      },
    },
    {
      $addFields: {
        task: { $arrayElemAt: ["$task", 0] },
        project: { $arrayElemAt: ["$project", 0] },
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
  const { id } = req.params;
  const { recordId, duration } = req.body;
  try {
    const timer = await Timer.findOne({ _id: id });
    // console.log(timer);
    const recordIndex = timer.timeRecord.findIndex(
      (record) => record._id.toString() === recordId
    );
    timer.timeRecord[recordIndex].duration = duration;
    await timer.save();
    res.status(StatusCodes.OK).json(timer);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
