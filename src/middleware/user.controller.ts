import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { UserService } from "../services";

export class UserController {
  constructor(private readonly userService: UserService) {}

  autoSuggest() {
    return (req: Request, res: Response): void => {
      try {
        const loginSubstring = req.query.loginSubstring as string;
        const limit = parseInt(req.query.limit as string);
        const users = this.userService.getAutoSuggestUsers(
          loginSubstring,
          limit
        );
        res.status(StatusCodes.OK).json(users);
      } catch (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
      }
    };
  }

  getUserById() {
    return (req: Request, res: Response): void => {
      try {
        const userId = req.params.id;
        const user = this.userService.getUserByID(userId);
        res.status(StatusCodes.OK).json(user);
      } catch (err) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    };
  }

  updateUser() {
    return (req: Request, res: Response): void => {
      try {
        const userId = req.params.id;
        const user = this.userService.updateUser(userId, req.body);
        res.status(StatusCodes.OK).json(user);
      } catch (err) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    };
  }

  deleteUser() {
    return (req: Request, res: Response): void => {
      try {
        const userId = req.params.id;
        this.userService.deleteUserById(userId);
        res.status(StatusCodes.NO_CONTENT).end();
      } catch (err) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      }
    };
  }

  getUsers() {
    return (req: Request, res: Response): void => {
      const users = this.userService.getUsers();
      res.status(StatusCodes.OK).json(users);
    };
  }

  addUser() {
    return (req: Request, res: Response): void => {
      try {
        const user = this.userService.addUser(req.body);
        res.status(StatusCodes.CREATED).json(user);
      } catch (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
      }
    };
  }
}
