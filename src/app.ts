import express from "express";

import { usersRouter, groupsRouter } from "./routers";

export const app = express();

app.use(express.json());

app.use("/users", usersRouter());
app.use("/groups", groupsRouter());
