import express from "express";
import { Router } from "express";

import { UserRepository } from "../repositories";
import { UserController, validateSchema } from "../middleware";
import { UserService } from "../services";
import { userSchema } from "../models";

export function usersRouter(): Router {
  const router = express.Router();
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userMiddleware = new UserController(userService);

  router.route("/auto-suggest").get(userMiddleware.autoSuggest());

  router
    .route("/:id")
    .get(userMiddleware.getUserById())
    .put(validateSchema(userSchema), userMiddleware.updateUser())
    .delete(userMiddleware.deleteUser());

  router
    .route("/")
    .get(userMiddleware.getUsers())
    .post(validateSchema(userSchema), userMiddleware.addUser());

  return router;
}
