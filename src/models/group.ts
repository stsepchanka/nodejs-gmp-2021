import * as Joi from "joi";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import { sequelize } from "../data-access/connectDB";

export const PERMISSIONS = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];
export type Permission = typeof PERMISSIONS[number];

export interface IGroup {
  id: string;
  name: string;
  permissions: Array<Permission>;
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
      set(value: Permission[]) {
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
            throw `Wrong permission ${wrongPermission}`;
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
