import express from "express";
import { Router } from "express";

import { UserRepository } from "../repositories";
import { UserMiddleware } from "../middleware";
import { UserService } from "../services";

export function usersRouter(): Router {
  const router = express.Router();
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userMiddleware = new UserMiddleware(userService);

  router.route("/auto-suggest").get(userMiddleware.autoSuggest());

  router
    .route("/:id")
    .get(userMiddleware.getUserById())
    .put(userMiddleware.updateUser())
    .delete(userMiddleware.deleteUser());

  router
    .route("/")
    .get(userMiddleware.getUsers())
    .post(userMiddleware.addUser());

  return router;
}
