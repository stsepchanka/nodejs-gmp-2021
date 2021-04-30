import express from "express";
import { Router } from "express";

import { validateSchema } from "../middleware";
import { UserService } from "../services";
import { UserController } from "./user.controller";
import { userSchema } from "../models";

export function usersRouter(): Router {
  const router = express.Router();
  const userService = new UserService();
  const userController = new UserController(userService);

  router.route("/auto-suggest").get(userController.autoSuggest());

  router
    .route("/:id")
    .get(userController.getUserById())
    .put(validateSchema(userSchema), userController.updateUser())
    .delete(userController.deleteUser());

  router
    .route("/")
    .get(userController.getUsers())
    .post(validateSchema(userSchema), userController.addUser());

  return router;
}
