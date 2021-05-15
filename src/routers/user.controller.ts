import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { UserService } from "../services";

export class UserController {
  constructor(private readonly userService: UserService) {}

  autoSuggest() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const { loginSubstring, limit } = req.query;
        const users = await this.userService.getAutoSuggestUsers(
          loginSubstring as string,
          parseInt(limit as string)
        );
        res.status(StatusCodes.OK).json(users);
      } catch (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
      }
    };
  }

  getUserById() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const userId = req.params.id;
        const user = await this.userService.getUserByID(userId);
        res.status(StatusCodes.OK).json(user);
      } catch (err) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    };
  }

  updateUser() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const userId = req.params.id;
        const user = await this.userService.updateUser(userId, req.body);
        res.status(StatusCodes.OK).json(user);
      } catch (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
      }
    };
  }

  deleteUser() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const userId = req.params.id;
        await this.userService.deleteUserById(userId);
        res.sendStatus(StatusCodes.NO_CONTENT);
      } catch (err) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    };
  }

  getUsers() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const users = await this.userService.getUsers();
        res.status(StatusCodes.OK).json(users);
      } catch {
        res.sendStatus(StatusCodes.SERVICE_UNAVAILABLE);
      }
    };
  }

  addUser() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const user = await this.userService.addUser(req.body);
        res.status(StatusCodes.CREATED).json(user);
      } catch (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
      }
    };
  }
}
