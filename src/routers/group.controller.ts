import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { GroupService } from "../services";

export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  getGroupById() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const groupId = req.params.id;
        const group = await this.groupService.getGroupByID(groupId);
        res.status(StatusCodes.OK).json(group);
      } catch (err) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    };
  }

  updateGroup() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const groupId = req.params.id;
        const group = await this.groupService.updateGroup(groupId, req.body);
        res.status(StatusCodes.OK).json(group);
      } catch (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
      }
    };
  }

  deleteGroup() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const groupId = req.params.id;
        await this.groupService.deleteGroupById(groupId);
        res.status(StatusCodes.NO_CONTENT).end();
      } catch (err) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    };
  }

  getGroups() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const groups = await this.groupService.getGroups();
        res.status(StatusCodes.OK).json(groups);
      } catch {
        res.sendStatus(StatusCodes.SERVICE_UNAVAILABLE);
      }
    };
  }

  addGroup() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const group = await this.groupService.addGroup(req.body);
        res.status(StatusCodes.CREATED).json(group);
      } catch (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
      }
    };
  }

  addUsersToGroup() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const groupId = req.params.id;
        const { userIds } = req.body;
        await this.groupService.addUsersToGroup(groupId, JSON.parse(userIds));
        res.status(StatusCodes.NO_CONTENT).end();
      } catch (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
      }
    };
  }
}
