import { Sequelize } from "sequelize";
import { DB_PATH } from "../common/config";

export const sequelize = new Sequelize(DB_PATH);
