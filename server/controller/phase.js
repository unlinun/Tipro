import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors";
import Phase from "../models/Phase.js";

// 取得單一階段
export const getSinglePhase = async (req, res) => {
  const { id: phaseId } = req.params;
  try {
    const phase = await Phase.findOne({ _id: phaseId });
    if (!phase) {
      throw new NotFoundError("No phase found!");
    }
    req.status(StatusCodes.OK).json(phase);
  } catch (error) {
    throw new BadRequestError("Cannot get phase, something went wrong!");
  }
};

// 創建一個項目階段
export const createPhase = async (req, res) => {
  const phase = await Phase.create(req.body);
  res.status(StatusCodes.CREATED).json(phase);
};

// 更新階段
export const updatePhase = async (req, res) => {
  const { id: phaseId } = req.params;
  try {
    const phase = await Phase.findOneAndUpdate({ _id: phaseId }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(StatusCodes.OK).json(phase);
  } catch (error) {
    throw new BadRequestError("Cannot update phase, something went wrong!");
  }
};

//刪除階段;
export const deletePhase = async (req, res) => {
  const { id: phaseId } = req.params;
  try {
    const phase = await Phase.findByIdAndDelete({ _id: phaseId });
    if (!phase) {
      throw new NotFoundError("No phase found!");
    }
    res.status(StatusCodes.OK).json(phase);
  } catch (error) {
    throw new BadRequestError("Cannot delete phase, something went wrong!");
  }
};
