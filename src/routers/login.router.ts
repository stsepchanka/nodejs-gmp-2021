import { Router, Request, Response, NextFunction } from "express";

import { getToken } from "../common/jwt";
import { ForbiddenError } from "../errors";
import { UserService } from "../services";

export function loginRouter(): Router {
  const router = Router();
  const userService = new UserService();

  router
    .route("/")
    .post(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const { login, password } = req.body;

          const user = await userService.getUserByLoginAndPassword(
            login,
            password
          );

          if (user) {
            const { id } = user;
            res.send(getToken(id, login));
          } else {
            next(
              new ForbiddenError(
                `User with login="${login}" and password="${password}" is not found`
              )
            );
          }
        } catch (err) {
          next(err);
        }
      }
    );

  return router;
}
