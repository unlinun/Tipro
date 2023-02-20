import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

// 更新使用者資料（要更新使用者的大頭貼） 2023/02/19 待解決
export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const avatar = req.file.avatar;
  try {
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    });
    user.password = undefined;
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
  }
};
