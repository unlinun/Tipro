import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

// 取得使用者
export const getUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await User.findById(userId, { password: 0 });
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

// 取得公司員工
export const getStaffs = async (req, res) => {
  const { id: company } = req.query;
  try {
    let staffs = await User.find({ companyID: company }, { password: 0 });
    res.status(StatusCodes.OK).json(staffs);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

// 更新使用者資料（要更新使用者的大頭貼） 2023/02/19 待解決
export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const avatar = req.file.avatar;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        ...req.body,
        avatar,
      },
      {
        new: true,
        runValidators: true,
      },
      { password: 0 }
    );
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
