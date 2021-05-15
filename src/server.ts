import { app } from "./app";
import { sequelize } from "./db/connectDB";
import { config } from "./common/config";

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
    app.listen(config.PORT, () => {
      console.log(`Server is running in http://localhost:${config.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
