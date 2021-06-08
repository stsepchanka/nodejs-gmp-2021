import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError as SequelizeValidationError } from "sequelize";
import {
  ForbiddenError,
  IncorrectRequestToDBError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../errors";
import { logger } from "../logger";

export function catchErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  const { url, body, query, method } = req;

  if (err instanceof ValidationError) {
    logger.error(
      `${method} ${url}; body: ${JSON.stringify(
        body
      )}; query params: ${JSON.stringify(
        query
      )}; validation error: ${JSON.stringify(err.details.errors)}`
    );
    return res.status(StatusCodes.BAD_REQUEST).json(err.details);
  }

  if (err instanceof NotFoundError) {
    logger.error(
      `${method} ${url}; body: ${JSON.stringify(
        body
      )}; query params: ${JSON.stringify(query)}; resource not found: ${
        err.text
      }`
    );
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }

  if (err instanceof ForbiddenError) {
    logger.error(
      `${method} ${url}; body: ${JSON.stringify(
        body
      )}; query params: ${JSON.stringify(query)}; access is forbidden: ${
        err.text
      }`
    );
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }

  if (err instanceof UnauthorizedError) {
    logger.error(
      `${method} ${url}; body: ${JSON.stringify(
        body
      )}; query params: ${JSON.stringify(query)}; unauthorized: ${err.text}`
    );
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  if (err instanceof MethodNotAllowedError) {
    logger.error(
      `${method} ${url}; body: ${JSON.stringify(
        body
      )}; query params: ${JSON.stringify(query)}; unauthorized: ${err.text}`
    );
    return res.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
  }

  if (err instanceof IncorrectRequestToDBError) {
    logger.error(
      `${method} ${url}; body: ${JSON.stringify(
        body
      )}; query params: ${JSON.stringify(query)}; incorrect request to DB: ${
        err.text
      }`
    );
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  if (err instanceof SequelizeValidationError) {
    logger.error(
      `${method} ${url}; body: ${JSON.stringify(
        body
      )}; query params: ${JSON.stringify(
        query
      )}; sequelize validation error: ${JSON.stringify(err.errors)}`
    );
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  if (err instanceof Error) {
    logger.error(
      `${method} ${url}; body: ${JSON.stringify(
        body
      )}; query params: ${JSON.stringify(query)}; unhandled error: ${err}`
    );
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  next();
}
