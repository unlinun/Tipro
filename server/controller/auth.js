import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

// register 註冊
export const register = async (req, res) => {
  // 1.在 UserSchema 中先對密碼進行預處理（詳見 ../models/User.js）
  try {
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ user: { username: user.username } });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
  }
};

//login 登入
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message: "Please provide email and password",
      },
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: {
          message: "Invalid Credential",
        },
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: {
          message: "Invalid Credential",
        },
      });
    }
    const token = user.createToken();
    // 將密碼從 user 物件中移除
    user.password = undefined;
    res.status(StatusCodes.OK).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
  }
};
