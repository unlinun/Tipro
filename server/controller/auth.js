import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

// register 註冊
export const register = async (req, res) => {
  // 1.在 UserSchema 中先對密碼進行預處理（詳見 ../models/User.js）
  let avatar = undefined;
  if (req.file && req.file.originalname) {
    return (avatar = req.file.originalname);
  }
  try {
    const user = new User({
      ...req.body,
      avatar,
    });
    user.save();
    res.status(StatusCodes.CREATED).json({ user: { username: user.username } });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

//login 登入
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    throw new BadRequestError("Please provide email and password");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credential");
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new UnauthenticatedError("Invalid Credential");
    }
    const token = user.createToken();
    // 將密碼從 user 物件中移除
    // Remove the password field from the user object
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    res.status(StatusCodes.OK).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
