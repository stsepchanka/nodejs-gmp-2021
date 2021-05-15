import express from "express";
import { Router } from "express";

import { trackExecutionTime, validateSchema } from "../middleware";
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
    .get(trackExecutionTime(groupController.getGroups()))
    .post(
      trackExecutionTime(validateSchema(groupSchema)),
      trackExecutionTime(groupController.addGroup())
    );

  router.route("/:id/users").post(groupController.addUsersToGroup());

  return router;
}
