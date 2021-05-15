import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export function trackExecutionTime(
  middleware: (req: Request, res: Response, next: NextFunction) => void
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { url, method } = req;

    const timestamp1 = new Date().valueOf();

    middleware(req, res, next);

    const timestamp2 = new Date().valueOf();

    logger.info(
      `${method} ${url}; execution time: ${timestamp2 - timestamp1}ms`
    );
  };
}
