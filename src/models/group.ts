import * as Joi from "joi";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../db/connectDB";
import { ValidationError } from "../errors";

export enum Permission {
  Read = "READ",
  Write = "WRITE",
  Delete = "DELETE",
  Share = "SHARE",
  Upload_Files = "UPLOAD_FILES",
}
export const PERMISSIONS = Object.values(Permission);

export type GroupPermission = typeof PERMISSIONS[number];

export interface IGroup {
  id: string;
  name: string;
  permissions: Array<GroupPermission>;
}

export class Group extends Model {
  toDomain(): IGroup {
    return this.toJSON() as IGroup;
  }
}

Group.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("permissions").split(", ");
      },
      set(value: GroupPermission[]) {
        this.setDataValue("permissions", value.toString());
      },
      validate: {
        hasCorrectPermission(values) {
          const wrongPermission = values
            .split(", ")
            .find(
              (value) => !PERMISSIONS.find((permission) => permission === value)
            );
          if (wrongPermission) {
            throw new ValidationError({
              status: "failed",
              errors: [
                {
                  path: "permissions",
                  message: `Wrong permission ${wrongPermission}`,
                },
              ],
            });
          }
        },
      },
    },
  },
  {
    sequelize,
    tableName: "groups",
    createdAt: false,
    updatedAt: false,
  }
);

export const groupSchema = Joi.object().keys({
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  permissions: Joi.string().required(),
});
