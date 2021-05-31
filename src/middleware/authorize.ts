import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../common/jwt";
import { ForbiddenError, UnauthorizedError } from "../errors";

const TOKEN_TYPE = "Bearer";

export function authorize(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization;

  if (!token) {
    return next(new UnauthorizedError("No token provided"));
  }

  const [tokenType, tokenValue] = token.split(" ");

  if (tokenType !== TOKEN_TYPE || !tokenValue) {
    return next(new ForbiddenError("Failed authentication token"));
  }

  verifyToken(tokenValue, (err) => {
    if (err) {
      return next(new ForbiddenError("Failed authentication token: ${err}"));
    }
    return next();
  });
}
