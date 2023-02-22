import { StatusCodes } from "http-status-codes";
import Task from "../models/Task.js";

//取得所有 tasks 包含所有人創建的或是自己創建的
export const getAllTasks = async (req, res) => {
  const { user } = req.query;
  const queryObject = {};
  // 找尋為自己創建的 task
  if (user) {
    queryObject.createdBy = user;
  }
  let result = Task.find(queryObject).sort({ startDate: -1 });
  const tasks = await result;
  res.status(StatusCodes.OK).json({ tasks, totalTasks: tasks.length });
};

// 取得單一 task
export const getSingleTask = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const task = Task.findOne({ _id: id, $or: [{ createdBy: user.id }] });
    if (!task) {
      throw new NotFoundError("No task found!");
    }
    return res.status(StatusCodes.OK).json(task);
  } catch (error) {
    throw new BadRequestError("Cannot get task, something went wrong!");
  }
};

//創建 task
export const createTask = async (req, res) => {
  const user = req.user;
  const tasks = await Task.create({ ...req.body, createdBy: user.id });

  res.status(StatusCodes.CREATED).json(tasks);
};

// 更新 task
export const updateTask = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        $or: [{ createdBy: user.id }],
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      throw new NotFoundError("No task found!");
    }
    return res.status(StatusCodes.OK).json(task);
  } catch (error) {
    throw new BadRequestError("Cannot update task, something went wrong!");
  }
};

// 刪除 task
export const deleteTask = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({
      _id: id,
      $or: [{ createdBy: user.id }],
    });
    if (!task) {
      throw new NotFoundError("No task found!");
    }
    res.status(StatusCodes.OK).json({ message: "Success deleted" });
  } catch (error) {
    throw new BadRequestError("Cannot delete task, something went wrong!");
  }
};
