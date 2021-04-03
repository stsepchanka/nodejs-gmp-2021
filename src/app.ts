import express from "express";

import { usersRouter } from "./routers";

export const app = express();

app.use(express.json());

app.use("/users", usersRouter());
