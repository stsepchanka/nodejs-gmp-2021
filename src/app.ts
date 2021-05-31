import express from "express";
import cors from "cors";

import { authorize, catchErrors, logInvokedMethods } from "./middleware";
import { loginRouter, usersRouter, groupsRouter } from "./routers";
import { corsOptions } from "./common/corsOptions";

export const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(logInvokedMethods);

app.use("/login", loginRouter());
app.use("/users", authorize, usersRouter());
app.use("/groups", authorize, groupsRouter());

app.use(catchErrors);
