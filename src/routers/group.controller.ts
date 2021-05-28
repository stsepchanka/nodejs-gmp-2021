import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

import { GroupService } from "../services";

export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  getGroupById() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const groupId = req.params.id;
        const group = await this.groupService.getGroupByID(groupId);
        if (group) {
          res.status(StatusCodes.OK).json(group);
        } else {
          next(new NotFoundError(`Group with id="${groupId}" is not found`));
        }
      } catch (err) {
        next(err);
      }
    };
  }

  updateGroup() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const groupId = req.params.id;
        const group = await this.groupService.updateGroup(groupId, req.body);
        if (group) {
          res.status(StatusCodes.OK).json(group);
        } else {
          next(new NotFoundError(`Group with id="${groupId}" is not found`));
        }
      } catch (err) {
        next(err);
      }
    };
  }

  deleteGroup() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const groupId = req.params.id;
        await this.groupService.deleteGroupById(groupId);
        res.sendStatus(StatusCodes.NO_CONTENT);
      } catch (err) {
        next(err);
      }
    };
  }

  getGroups() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const groups = await this.groupService.getGroups();
        res.status(StatusCodes.OK).json(groups);
      } catch (err) {
        next(err);
      }
    };
  }

  addGroup() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const group = await this.groupService.addGroup(req.body);
        res.status(StatusCodes.CREATED).json(group);
      } catch (err) {
        next(err);
      }
    };
  }

  addUsersToGroup() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const groupId = req.params.id;
        const { userIds } = req.body;
        await this.groupService.addUsersToGroup(groupId, JSON.parse(userIds));
        res.sendStatus(StatusCodes.NO_CONTENT);
      } catch (err) {
        next(err);
      }
    };
  }
}
