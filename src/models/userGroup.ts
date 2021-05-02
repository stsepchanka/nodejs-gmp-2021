import { DataTypes, Model, UUIDV4 } from "sequelize";

import { Group, User } from ".";
import { sequelize } from "../data-access/connectDB";

export class UserGroup extends Model {}

UserGroup.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    userId: {
      type: DataTypes.UUIDV4,
      field: "userid",
    },
    groupId: {
      type: DataTypes.UUIDV4,
      field: "groupid",
    },
  },
  {
    sequelize,
    tableName: "usergroup",
    createdAt: false,
    updatedAt: false,
  }
);

User.belongsToMany(Group, {
  through: UserGroup,
  foreignKey: "userid",
  onDelete: "CASCADE",
});
Group.belongsToMany(User, {
  through: UserGroup,
  foreignKey: "groupid",
  onDelete: "CASCADE",
});
