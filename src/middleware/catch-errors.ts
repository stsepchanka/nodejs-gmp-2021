import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError as SequelizeValidationError } from "sequelize";
import {
  IncorrectRequestToDBError,
  NotFoundError,
  ValidationError,
} from "../errors";
import { logger } from "../logger";

export function catchErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  const { url, method } = req;

  if (err instanceof ValidationError) {
    logger.error(
      `${method} ${url}; validation error: ${JSON.stringify(
        err.details.errors
      )}`
    );
    return res.status(err.status).json(err.details);
  }

  if (err instanceof NotFoundError) {
    logger.error(`${method} ${url}; resource not found: ${err.text}`);
    return res.sendStatus(err.status);
  }

  if (err instanceof IncorrectRequestToDBError) {
    logger.error(`${method} ${url}; incorrect request to DB: ${err.text}`);
    return res.sendStatus(err.status);
  }

  if (err instanceof SequelizeValidationError) {
    logger.error(
      `${method} ${url}; sequelize validation error: ${JSON.stringify(
        err.errors
      )}`
    );
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  if (err instanceof Error) {
    logger.error(`${method} ${url}; unhandled error: ${err}`);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  next();
}
