import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ValidationDetails, ValidationError } from "../errors";

export function validateSchema(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error && error.isJoi) {
      next(new ValidationError(errorResponse(error.details)));
    }
    next();
  };
}

function errorResponse(schemaErrors): ValidationDetails {
  const errors = schemaErrors.map(({ path, message }) => ({ path, message }));
  return {
    status: "failed",
    errors,
  };
}
