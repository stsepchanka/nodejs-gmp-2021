import express from "express";
import { Router } from "express";

import { validateSchema } from "../middleware";
import { GroupService } from "../services";
import { GroupController } from "./group.controller";
import { groupSchema } from "../models";

export function groupsRouter(): Router {
  const router = express.Router();
  const groupService = new GroupService();
  const groupController = new GroupController(groupService);

  router
    .route("/:id")
    .get(groupController.getGroupById())
    .put(validateSchema(groupSchema), groupController.updateGroup())
    .delete(groupController.deleteGroup());

  router
    .route("/")
    .get(groupController.getGroups())
    .post(validateSchema(groupSchema), groupController.addGroup());

  router.route("/:id/users").post(groupController.addUsersToGroup());

  return router;
}
