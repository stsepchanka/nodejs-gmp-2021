import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

import { UserService } from "../services";

export class UserController {
  constructor(private readonly userService: UserService) {}

  autoSuggest() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const { loginSubstring, limit } = req.query;
        const users = await this.userService.getAutoSuggestUsers(
          loginSubstring as string,
          parseInt(limit as string)
        );
        res.status(StatusCodes.OK).json(users);
      } catch (err) {
        next(err);
      }
    };
  }

  getUserById() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const userId = req.params.id;
        const user = await this.userService.getUserByID(userId);
        if (user) {
          res.status(StatusCodes.OK).json(user);
        } else {
          next(new NotFoundError(`User with id="${userId}" is not found`));
        }
      } catch (err) {
        next(err);
      }
    };
  }

  updateUser() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const userId = req.params.id;
        const user = await this.userService.updateUser(userId, req.body);
        if (user) {
          res.status(StatusCodes.OK).json(user);
        } else {
          next(new NotFoundError(`User with id="${userId}" is not found`));
        }
      } catch (err) {
        next(err);
      }
    };
  }

  deleteUser() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const userId = req.params.id;
        await this.userService.deleteUserById(userId);
        res.sendStatus(StatusCodes.NO_CONTENT);
      } catch (err) {
        next(err);
      }
    };
  }

  getUsers() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const users = await this.userService.getUsers();
        res.status(StatusCodes.OK).json(users);
      } catch (err) {
        next(err);
      }
    };
  }

  addUser() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const user = await this.userService.addUser(req.body);
        res.status(StatusCodes.CREATED).json(user);
      } catch (err) {
        next(err);
      }
    };
  }
}
