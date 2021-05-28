import { app } from "./app";
import { sequelize } from "./db/connectDB";
import { PORT } from "./common/config";
import { logger } from "./logger";

process.on("uncaughtException", (error) => {
  logger.error(`captured error: ${error.message}`);
  process.exitCode = 1;
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled rejection detected: ${reason}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running in http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
