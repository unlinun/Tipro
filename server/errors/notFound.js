import { StatusCodes } from "http-status-codes";
import CustomError from "./customError";

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
