import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function validateSchema(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): Response => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error && error.isJoi) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(errorResponse(error.details));
    }
    next();
  };
}

function errorResponse(schemaErrors) {
  const errors = schemaErrors.map(({ path, message }) => ({ path, message }));
  return {
    status: "failed",
    errors,
  };
}
