import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
    new transports.File({
      filename: "info.log",
      level: "info",
    }),
  ],
});
