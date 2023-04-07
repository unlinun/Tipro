import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/notFound.js";
import BadRequestError from "../errors/badRequest.js";
import Memo from "../models/Memo.js";

export const getAllMemo = async (req, res, next) => {
  const user = req.user;
  try {
    const memos = await Memo.find({ createdBy: user.id }).sort({
      createdAt: -1,
    });
    res.status(StatusCodes.OK).json(memos);
  } catch (error) {
    next(new BadRequestError("Unable to fetch memos."));
  }
};

export const getSingleMemo = async (req, res, next) => {
  const user = req.user;
  try {
    const memo = await Memo.findOne({
      createdBy: user.id,
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(23, 59, 59, 59),
      },
    });
    if (!memo) {
      throw new NotFoundError("Memo not found.");
    }
    return res.status(StatusCodes.OK).json(memo);
  } catch (error) {
    next(new BadRequestError("Unable to fetch memo."));
  }
};

export const createMemo = async (req, res, next) => {
  const user = req.user;
  try {
    const memo = await Memo.create({
      ...req.body,
      createdBy: user.id,
    });
    res.status(StatusCodes.CREATED).json(memo);
  } catch (error) {
    next(new BadRequestError("Unable to create memo."));
  }
};

export const updateSingleMemo = async (req, res, next) => {
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
      throw new NotFoundError("Memo not found.");
    }
    res.status(StatusCodes.OK).json(memo);
  } catch (error) {
    next(new BadRequestError("Unable to update memo."));
  }
};

export const deleteSingleMemo = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const memo = await Memo.findOneAndDelete({
      _id: id,
      createdBy: user.id,
    });
    if (!memo) {
      throw new NotFoundError("Memo not found.");
    }
    res.status(StatusCodes.OK).json(memo);
  } catch (error) {
    next(new BadRequestError("Unable to delete memo."));
  }
};
