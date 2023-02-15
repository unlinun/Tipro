import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

// 取得公司員工資訊

export const getStaffs = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });
  console.log(user);
  // 找尋包含自己的項目
  const staffs = await User.find({
    companyID: user.companyID,
  });
  staffs.password = undefined;
  res.status(StatusCodes.OK).json({ staffs });
};
