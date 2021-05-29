import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_TOKEN_EXPIRE_TIME } from "./config";

export interface JWTPayload {
  id: string;
  login: string;
}

export function getToken(id: string, login: string): string {
  return jwt.sign({ id, login }, JWT_SECRET_KEY, {
    expiresIn: JWT_TOKEN_EXPIRE_TIME,
  });
}

export function verifyToken(
  token: string,
  cb: (error: Error, payload: JWTPayload) => void
): void {
  jwt.verify(token, JWT_SECRET_KEY, cb);
}
