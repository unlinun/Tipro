import { StatusCodes } from "http-status-codes";
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: { message: "Project not found" } });
    }
    return res.status(StatusCodes.OK).json(project);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: { message: "Project not found" } });
    }
    res.status(StatusCodes.OK).json(project);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: { message: "Project not found" } });
    }
    res.status(StatusCodes.OK).json({ message: "success deleted" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
  }
};
