import { app } from "./app";
import { sequelize } from "./db/connectDB";
import { PORT } from "./common/config";

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
