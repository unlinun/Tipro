import { StatusCodes } from "http-status-codes";
import Phase from "../models/Phase.js";

export const getSinglePhase = async (req, res) => {
  const { id: phaseId } = req.params;
  const phase = await Phase.findOne({ _id: phaseId });
  if (!phase) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "No phase found" });
  }
  req.status(StatusCodes.OK).json(phase);
};

export const createPhase = async (req, res) => {
  const phase = await Phase.create(req.body);
  res.status(StatusCodes.CREATED).json(phase);
};

export const updatePhase = async (req, res) => {
  const { id: phaseId } = req.params;
  const phase = await Phase.findOneAndUpdate({ _id: phaseId }, req.body, {
    new: true,
    runValidators: true,
  });
};
