import { StatusCodes } from "http-status-codes";
export const errorHandlerMiddleware = (error, req, res, next) => {
  const customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Oops, something went wrong!",
  };

  if (error.kind === "required") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res
    .status(customError.statusCode)
    .json({ error: { message: customError.message } });
};
