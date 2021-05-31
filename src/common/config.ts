import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_PATH = process.env.DB_PATH || "";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";
export const JWT_TOKEN_EXPIRE_TIME = process.env.JWT_TOKEN_EXPIRE_TIME || 600;

export const WHITE_LIST = process.env.WHITE_LIST || "";
