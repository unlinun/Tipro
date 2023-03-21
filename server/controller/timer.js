import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import BadRequestError from "../errors/badRequest.js";
import NotFoundError from "../errors/notFound.js";
import { getWeekEndDate, getWeekStartDate } from "../helper/date.js";
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

// 根據項目的 id 找到 timer
export const getProjectTimer = async (req, res) => {
  const { id } = req.params;
  try {
    const timer = await Timer.find({ projectId: id });
    if (!timer) {
      throw new NotFoundError("No timer found!");
    }
    res.status(StatusCodes.OK).json(timer);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

export const createTimer = async (req, res) => {
  const timer = await Timer.create(req.body);
  res.status(StatusCodes.CREATED).json(timer);
};

// 當按下生成，會更新 timer 的 timeRecord
export const updateTimer = async (req, res) => {
  const user = req.user;
  const { startDate } = req.body;
  // 找到 user 創建的 timer
  const weekStartDate = getWeekStartDate(new Date(startDate));
  console.log(weekStartDate);
  const weekEndDate = getWeekEndDate(weekStartDate);
  try {
    // 找出本週開始的 timer (跟 task 有關聯，如果 task 的 startDate 是在本週的日程中，就會創建本週開始的 timer)
    const timer = await Timer.find({
      createdBy: user.id,
      startDate: { $lte: weekEndDate },
      endDate: null,
    });
    console.log(timer);
    const timeRecord = [{ dateOfWeek: weekStartDate, duration: 0 }];
    // 創建本週的新 timeRecord
    const newWeekStartDate = new Date(weekStartDate);
    for (let i = 0; i < 6; i++) {
      const time = {
        dateOfWeek: new Date(
          newWeekStartDate.setDate(newWeekStartDate.getDate() + 1)
        ),
        duration: 0,
      };
      timeRecord.push(time);
    }
    // Loop through each timer and update its time record 如果還沒有創建當週的 timeRecord
    const updatedTimers = await Promise.all(
      timer.map(async (time) => {
        const isCreated = time.timeRecord.find(
          (record) =>
            record.dateOfWeek >= weekStartDate &&
            record.dateOfWeek <= weekEndDate
        );
        if (!isCreated) {
          // Add the new time record to the timer's timeRecord array
          time.timeRecord.push(...timeRecord);
          // Save the updated timer to the database
          await time.save();
        }
        return time;
      })
    );
    // Return the updated timers as the response
    return res.status(200).json(updatedTimers);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

export const updateTimerDuration = async (req, res) => {
  const { id } = req.params;
  const { recordId, duration } = req.body;
  try {
    const timer = await Timer.findOne({ _id: id });
    if (recordId && duration) {
      const recordIndex = timer.timeRecord.findIndex(
        (record) => record._id.toString() === recordId
      );
      timer.timeRecord[recordIndex].duration = duration;
    }
    await timer.save();
    res.status(StatusCodes.OK).json(timer);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
