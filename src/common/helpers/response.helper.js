import { statusCodes } from "../helpers/statusCodes.helper.js";

export const responseSuccess = (
  data,
  message = "Success",
  statusCode = statusCodes.OK,
) => {
  return {
    status: "success",
    statusCode: statusCode,
    message: message,
    data: data,
  };
};

export const responseError = (
  message = "Error",
  statusCode = statusCodes.INTERNAL_SERVER_ERROR,
  stack,
) => {
  return {
    status: "error",
    statusCode: statusCode,
    message: message,
    stack: stack,
  };
};
