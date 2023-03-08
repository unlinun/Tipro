import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/notFound.js";
import BadRequestError from "../errors/badRequest.js";
import mongoose from "mongoose";

import Projects from "../models/Projects.js";
// 取得所有跟自己有關的項目
export const getAllProjects = async (req, res) => {
  const user = req.user;
  // 找尋包含自己的項目、merge 員工（使用lookup）
  const projects = await Projects.aggregate([
    {
      $match: {
        $or: [
          { manager: user.id },
          { staff: user.id },
          { createdBy: mongoose.Types.ObjectId(user.id) },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        let: { staff: "$staff" },
        pipeline: [
          // 將 user 中的 _id 轉換為 string 來與 staff 中的 id 進行匹配
          {
            $match: {
              $expr: {
                $in: [{ $toString: "$_id" }, "$$staff"],
              },
            },
          },
          // 匹配後只呈現 avatar 與 username 至前端
          { $project: { avatar: 1, username: 1 } },
        ],
        as: "staff",
      },
    },
    {
      $lookup: {
        from: "users",
        let: { manager: "$manager" },
        pipeline: [
          // 將 user 中的 _id 轉換為 string 來與 staff 中的 id 進行匹配
          {
            $match: {
              $expr: {
                $eq: [{ $toString: "$_id" }, "$$manager"],
              },
            },
          },
          // 匹配後只呈現 avatar 與 username 至前端
          { $project: { avatar: 1, username: 1 } },
        ],
        as: "manager",
      },
    },
  ]).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ projects, totalProjects: projects.length });
};

// 取得單一項目
export const getSingleProject = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  const user = req.user;
  try {
    // 使用 mogodb $match 與 $lookup 來取得資料
    const project = await Projects.aggregate([
      {
        $match: {
          _id: id,
          $or: [
            { manager: user.id },
            { staff: user.id },
            { createdBy: mongoose.Types.ObjectId(user.id) },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          let: { staff: "$staff" },
          pipeline: [
            // 將 user 中的 _id 轉換為 string 來與 staff 中的 id 進行匹配
            {
              $match: {
                $expr: {
                  $in: [{ $toString: "$_id" }, "$$staff"],
                },
              },
            },
            // 匹配後只呈現 avatar 與 username 至前端
            { $project: { avatar: 1, username: 1 } },
          ],
          as: "staff",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { manager: "$manager" },
          pipeline: [
            // 將 user 中的 _id 轉換為 string 來與 staff 中的 id 進行匹配
            {
              $match: {
                $expr: {
                  $eq: [{ $toString: "$_id" }, "$$manager"],
                },
              },
            },
            // 匹配後只呈現 avatar 與 username 至前端
            { $project: { avatar: 1, username: 1 } },
          ],
          as: "manager",
        },
      },
    ]);

    if (!project) {
      throw new NotFoundError("No project found!");
    }
    return res.status(StatusCodes.OK).json(project[0]);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

// 創建一個項目
export const createProject = async (req, res) => {
  const user = req.user;
  const project = await Projects.create({
    ...req.body,
    createdBy: user.id,
  });

  res.status(StatusCodes.CREATED).json(project);
};

// 更新一個項目
export const updateProject = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const project = await Projects.findOneAndUpdate(
      { _id: id, $or: [{ manager: user.id }, { createdBy: user.id }] },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!project) {
      throw new NotFoundError("No project found!");
    }
    res.status(StatusCodes.OK).json(project);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

// 刪除一個項目
// 刪除 project  => 在刪除 project 後也需要一起刪除關聯的 timer!!!!
export const deleteProject = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const project = await Projects.findOne({
      _id: id,
      $or: [{ manager: user.id }, { createdBy: user.id }],
    });
    if (!project) {
      throw new NotFoundError("No project found!");
    }
    await project.deleteOne();
    res.status(StatusCodes.OK).json({ message: "success deleted" });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
