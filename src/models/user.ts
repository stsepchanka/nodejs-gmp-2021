import * as Joi from "joi";

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export const userSchema = Joi.object().keys({
  id: Joi.string().uuid().optional(),
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean().optional(),
});
