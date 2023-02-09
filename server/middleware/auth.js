import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const authorizationToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: { message: "Invalid credential" } });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: { message: "Invalid credential" } });
    }
    // token驗證 => 透過 jwt.verify完成 base64解碼與 token 驗證
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = {
      userID: payload.userID,
      username: payload.username,
      companyID: payload.companyID,
    };
    next();
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
  }
};
