import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/notFound.js";
import BadRequestError from "../errors/badRequest.js";
import Memo from "../models/Memo.js";

export const getAllMemo = async (req, res) => {
  const user = req.user;
  try {
    const memos = await Memo.find({ createdBy: user.id }).sort({
      createdAt: -1,
    });
    res.status(StatusCodes.OK).json(memos);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

export const getSingleMemo = async (req, res) => {
  const user = req.user;
  try {
    const memo = await Memo.findOne({
      createdBy: user.id,
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(23, 59, 59, 59),
      },
    });
    return res.status(StatusCodes.OK).json(memo);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

export const createMemo = async (req, res) => {
  const user = req.user;
  const memo = await Memo.create({
    ...req.body,
    createdBy: user.id,
  });
  res.status(StatusCodes.CREATED).json(memo);
};

export const updateSingleMemo = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const memo = await Memo.findOneAndUpdate(
      {
        _id: id,
        createdBy: user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!memo) {
      throw new NotFoundError("memo not found!");
    }
    res.status(StatusCodes.OK).json(memo);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

export const deleteSingleMemo = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const memo = await Memo.findOneAndDelete({
      _id: id,
      createdBy: user.id,
    });
    if (!memo) {
      throw new NotFoundError("memo not found!");
    }
    res.status(StatusCodes.OK).json(memo);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
