import { StatusCodes } from "http-status-codes";
import Tasks from "../models/Tasks.js";

//取得所有 tasks 包含所有人創建的或是自己創建的
export const getAllTasks = async (req, res) => {
  const { user } = req.query;
  const queryObject = {};
  // 找尋為自己創建的 task
  if (user) {
    queryObject.createdBy = user;
  }
  let result = Tasks.find(queryObject).sort({ startDate: -1 });
  const tasks = await result;
  res.status(StatusCodes.OK).json({ tasks, totalTasks: tasks.length });
};

// 取得單一 task
export const getSingleTask = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const task = Tasks.findOne({ _id: id, $or: [{ createdBy: user.id }] });
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: { message: "Task not found" } });
    }
    return res.status(StatusCodes.OK).json(task);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
  }
};

//創建 task
export const createTask = async (req, res) => {
  const user = req.user;
  const tasks = await Tasks.create({ ...req.body, createdBy: user.id });

  res.status(StatusCodes.CREATED).json(tasks);
};

// 更新 task
export const updateTask = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const task = await Tasks.findOneAndUpdate(
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: { message: "Task not found" } });
    }
    return res.status(StatusCodes.OK).json(task);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
  }
};

// 刪除 task
export const deleteTask = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const task = await Tasks.findOneAndDelete({
      _id: id,
      $or: [{ createdBy: user.id }],
    });
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: { message: "task not found" },
      });
    }
    res.status(StatusCodes.OK).json({ message: "Success deleted" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
  }
};
