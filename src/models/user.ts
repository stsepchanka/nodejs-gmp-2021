import * as Joi from "joi";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../db/connectDB";

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export class User extends Model {
  toDomain(): IUser {
    return this.toJSON() as IUser;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "isdeleted",
    },
  },
  {
    sequelize,
    tableName: "users",
    createdAt: false,
    updatedAt: false,
  }
);

export const userSchema = Joi.object().keys({
  id: Joi.string().uuid().optional(),
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean().optional(),
});
