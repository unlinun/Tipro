import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors";

import Projects from "../models/Projects.js";
// 取得所有跟自己有關的項目
export const getAllProjects = async (req, res) => {
  const user = req.user;
  // 找尋包含自己的項目
  const projects = await Projects.find({
    $or: [{ manager: user.id }, { staff: user.id }, { createdBy: user.id }],
  }).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ projects, totalProjects: projects.length });
};

// 取得單一項目
export const getSingleProject = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const project = await Projects.findOne({
      _id: id,
      $or: [{ manager: user.id }, { staff: user.id }, { createdBy: user.id }],
    });
    if (!project) {
      throw new NotFoundError("No project found!");
    }
    return res.status(StatusCodes.OK).json(project);
  } catch (error) {
    throw new BadRequestError("Cannot get project, something went wrong!");
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
    throw new BadRequestError("Cannot update project, something went wrong!");
  }
};

// 刪除一個項目
export const deleteProject = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const project = await Projects.findOneAndDelete({
      _id: id,
      $or: [{ manager: user.id }, { createdBy: user.id }],
    });
    if (!project) {
      throw new NotFoundError("No project found!");
    }
    res.status(StatusCodes.OK).json({ message: "success deleted" });
  } catch (error) {
    throw new BadRequestError("Cannot delete project, something went wrong!");
  }
};
