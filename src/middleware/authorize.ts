import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../common/jwt";
import { ForbiddenError, UnauthorizedError } from "../errors";

export function authorize(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let token = req.headers.authorization;

  if (!token) {
    return next(new UnauthorizedError("No token provided"));
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  verifyToken(token, (err) => {
    if (err) {
      return next(new ForbiddenError("Failed authentication token"));
    }
    return next();
  });
}
