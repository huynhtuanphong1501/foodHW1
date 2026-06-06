import { responseError } from "./response.helper.js";
import { statusCodes } from "../constants/statusCodes.constant.js";

export const appErrorHandler = (err, req, res, next) => {
  console.error("lỗi", err);
  const response = responseError(
    err.message || "Internal Server Error",
    err.status || statusCodes.INTERNAL_SERVER_ERROR,
    err.stack,
  );
  res.status(response.statusCode).json(response);
};
