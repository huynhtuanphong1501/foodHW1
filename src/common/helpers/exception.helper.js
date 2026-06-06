import { statusCodes } from "../helpers/statusCodes.helper.js";

export class BadrequestError extends Error {
  status = statusCodes.BAD_REQUEST;
  name = "BadrequestError";
  constructor(message) {
    super(message);
  }
}

export class NotFoundError extends Error {
  status = statusCodes.NOT_FOUND;
  name = "NotFoundError";
  constructor(message) {
    super(message);
  }
}

export class InternalServerError extends Error {
  status = statusCodes.INTERNAL_SERVER_ERROR;
  name = "InternalServerError";
  constructor(message) {
    super(message);
  }
}

export class UnauthorizedError extends Error {
  status = statusCodes.UNAUTHORIZED;
  name = "UnauthorizedError";
  constructor(message) {
    super(message);
  }
}

export class ForbiddenError extends Error {
  status = statusCodes.FORBIDDEN;
  name = "ForbiddenError";
  constructor(message) {
    super(message);
  }
}
