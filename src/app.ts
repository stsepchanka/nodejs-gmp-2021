import express from "express";
import { catchErrors, logInvokedMethods } from "./middleware";

import { usersRouter, groupsRouter } from "./routers";

export const app = express();

app.use(express.json());

app.use(logInvokedMethods);

app.use("/users", usersRouter());
app.use("/groups", groupsRouter());

app.use(catchErrors);
