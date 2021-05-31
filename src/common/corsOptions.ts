import { MethodNotAllowedError } from "../errors";
import { WHITE_LIST } from "./config";

export const corsOptions = {
  origin: (
    origin: string,
    callback: (error: Error, origin: string) => void
  ): void => {
    if (!origin || WHITE_LIST.indexOf(origin) > -1) {
      callback(null, origin);
    } else {
      callback(new MethodNotAllowedError("Not allowed by CORS"), origin);
    }
  },
};
