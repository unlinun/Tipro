import { StatusCodes } from "http-status-codes";
import CustomError from "./customError.js";

// 驗證失敗
class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
