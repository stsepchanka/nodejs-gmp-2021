import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export function logInvokedMethods(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { url, body, query, method } = req;

  logger.info(
    `${method} ${url}; body: ${JSON.stringify(
      body
    )}; query params: ${JSON.stringify(query)}`
  );
  next();
}
