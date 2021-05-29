import express from "express";
import cors from "cors";

import { authorize, catchErrors, logInvokedMethods } from "./middleware";
import { loginRouter, usersRouter, groupsRouter } from "./routers";

export const app = express();

app.use(cors());

app.use(express.json());

app.use(logInvokedMethods);

app.use("/login", loginRouter());
app.use("/users", authorize, usersRouter());
app.use("/groups", authorize, groupsRouter());

app.use(catchErrors);
