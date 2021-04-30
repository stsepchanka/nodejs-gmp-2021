import { Sequelize } from "sequelize";
import { config } from "./../common/config";

export const sequelize = new Sequelize(config.DB_PATH);
