import { getMockReq, getMockRes } from "@jest-mock/express";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";

import { UserController } from "./user.controller";
import { UserService } from "../services/user.service";
import { NotFoundError } from "../errors";
import { User } from "../models";

jest.mock("../services/user.service");

const UserServiceMock = UserService as jest.MockedClass<typeof UserService>;
const NotFoundErrorMock = NotFoundError as jest.MockedClass<
  typeof NotFoundError
>;

const { res, next, mockClear } = getMockRes();

beforeEach(() => {
  UserServiceMock.mockClear();

  mockClear();
});

describe("UserController", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("autoSuggest", () => {
    let req: Request;
    let limit: string;
    let loginSubstring: string;

    beforeEach(() => {
      limit = "5";
      loginSubstring = "Login Substring";
      req = getMockReq({ query: { loginSubstring, limit } });
    });

    it("should call getAutoSuggestUsers from UserService", async () => {
      const userController = new UserController(new UserServiceMock());

      await userController.autoSuggest()(req, res, next);

      expect(
        UserServiceMock.prototype.getAutoSuggestUsers
      ).toHaveBeenCalledWith(loginSubstring, +limit);
    });

    it("should respond with the array of users", async () => {
      const usersStub = [];
      UserServiceMock.prototype.getAutoSuggestUsers = jest
        .fn()
        .mockResolvedValue(usersStub);
      const userController = new UserController(new UserServiceMock());

      await userController.autoSuggest()(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(usersStub);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      UserServiceMock.prototype.getAutoSuggestUsers = jest
        .fn()
        .mockRejectedValue(errorStub);
      const userController = new UserController(new UserServiceMock());

      await userController.autoSuggest()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("getUserById", () => {
    let req: Request;
    let userId: string;

    beforeEach(() => {
      userId = "user Id";
      req = getMockReq({ params: { id: userId } });
    });

    it("should call getUserById from UserService", async () => {
      const userController = new UserController(new UserServiceMock());

      await userController.getUserById()(req, res, next);

      expect(UserServiceMock.prototype.getUserByID).toHaveBeenCalledWith(
        userId
      );
    });

    it("should call next with NotFoundError if user is not found", async () => {
      UserServiceMock.prototype.getUserByID = jest.fn().mockResolvedValue(null);
      const userController = new UserController(new UserServiceMock());

      await userController.getUserById()(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFoundErrorMock(""));
    });

    it("should respond with the found user", async () => {
      const userStub = {} as User;
      UserServiceMock.prototype.getUserByID = jest
        .fn()
        .mockResolvedValue(userStub);
      const userController = new UserController(new UserServiceMock());

      await userController.getUserById()(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(userStub);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      UserServiceMock.prototype.getUserByID = jest
        .fn()
        .mockRejectedValue(errorStub);
      const userController = new UserController(new UserServiceMock());

      await userController.getUserById()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("updateUser", () => {
    let req: Request;
    let updatedUser: User;
    let userId: string;

    beforeEach(() => {
      updatedUser = {} as User;
      userId = "user Id";
      req = getMockReq({ params: { id: userId }, body: updatedUser });
    });

    it("should call updateUser from UserService", async () => {
      const userController = new UserController(new UserServiceMock());

      await userController.updateUser()(req, res, next);

      expect(UserServiceMock.prototype.updateUser).toHaveBeenCalledWith(
        userId,
        updatedUser
      );
    });

    it("should call next with NotFoundError if user is not found", async () => {
      UserServiceMock.prototype.updateUser = jest.fn().mockResolvedValue(null);
      const userController = new UserController(new UserServiceMock());

      await userController.updateUser()(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFoundErrorMock(""));
    });

    it("should respond with the updated user", async () => {
      const userStub = {} as User;
      UserServiceMock.prototype.updateUser = jest
        .fn()
        .mockResolvedValue(userStub);
      const userController = new UserController(new UserServiceMock());

      await userController.updateUser()(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(userStub);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      UserServiceMock.prototype.updateUser = jest
        .fn()
        .mockRejectedValue(errorStub);
      const userController = new UserController(new UserServiceMock());

      await userController.updateUser()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("deleteUser", () => {
    let req: Request;
    let userId: string;

    beforeEach(() => {
      userId = "user Id";
      req = getMockReq({ params: { id: userId } });
    });

    it("should call deleteUserById from UserService", async () => {
      const userController = new UserController(new UserServiceMock());

      await userController.deleteUser()(req, res, next);

      expect(UserServiceMock.prototype.deleteUserById).toHaveBeenCalledWith(
        userId
      );
    });

    it("should respond with NO_CONTENT", async () => {
      UserServiceMock.prototype.deleteUserById = jest.fn();
      const userController = new UserController(new UserServiceMock());

      await userController.deleteUser()(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      UserServiceMock.prototype.deleteUserById = jest
        .fn()
        .mockRejectedValue(errorStub);
      const userController = new UserController(new UserServiceMock());

      await userController.deleteUser()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("getUsers", () => {
    let req: Request;

    beforeEach(() => {
      req = getMockReq();
    });

    it("should call getUsers from UserService", async () => {
      const userController = new UserController(new UserServiceMock());

      await userController.getUsers()(req, res, next);

      expect(UserServiceMock.prototype.getUsers).toHaveBeenCalled();
    });

    it("should respond with the array of users", async () => {
      const usersStub = [];
      UserServiceMock.prototype.getUsers = jest
        .fn()
        .mockResolvedValue(usersStub);
      const userController = new UserController(new UserServiceMock());

      await userController.getUsers()(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(usersStub);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      UserServiceMock.prototype.getUsers = jest
        .fn()
        .mockRejectedValue(errorStub);
      const userController = new UserController(new UserServiceMock());

      await userController.getUsers()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("addUser", () => {
    let req: Request;
    const addedUser = {} as User;
    beforeEach(() => {
      req = getMockReq({ body: addedUser });
    });

    it("should call addUser from UserService", async () => {
      const userController = new UserController(new UserServiceMock());

      await userController.addUser()(req, res, next);

      expect(UserServiceMock.prototype.addUser).toHaveBeenCalledWith(addedUser);
    });

    it("should respond with added user", async () => {
      UserServiceMock.prototype.addUser = jest
        .fn()
        .mockResolvedValue(addedUser);
      const userController = new UserController(new UserServiceMock());

      await userController.addUser()(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(res.json).toHaveBeenCalledWith(addedUser);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      UserServiceMock.prototype.addUser = jest
        .fn()
        .mockRejectedValue(errorStub);
      const userController = new UserController(new UserServiceMock());

      await userController.addUser()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });
});
