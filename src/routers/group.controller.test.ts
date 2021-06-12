import { getMockReq, getMockRes } from "@jest-mock/express";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";

import { GroupController } from "./group.controller";
import { GroupService } from "../services/group.service";
import { NotFoundError } from "../errors";
import { Group } from "../models";

jest.mock("../services/group.service");

const GroupServiceMock = GroupService as jest.MockedClass<typeof GroupService>;
const NotFoundErrorMock = NotFoundError as jest.MockedClass<
  typeof NotFoundError
>;

const { res, next, mockClear } = getMockRes();

beforeEach(() => {
  GroupServiceMock.mockClear();

  mockClear();
});

describe("GroupController", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getGroupById", () => {
    let req: Request;
    let groupId: string;

    beforeEach(() => {
      groupId = "group Id";
      req = getMockReq({ params: { id: groupId } });
    });

    it("should call getGroupById from GroupService", async () => {
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.getGroupById()(req, res, next);

      expect(GroupServiceMock.prototype.getGroupByID).toHaveBeenCalledWith(
        groupId
      );
    });

    it("should call next with NotFoundError if group is not found", async () => {
      GroupServiceMock.prototype.getGroupByID = jest
        .fn()
        .mockResolvedValue(null);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.getGroupById()(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFoundErrorMock(""));
    });

    it("should respond with the found group", async () => {
      const groupStub = {} as Group;
      GroupServiceMock.prototype.getGroupByID = jest
        .fn()
        .mockResolvedValue(groupStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.getGroupById()(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(groupStub);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      GroupServiceMock.prototype.getGroupByID = jest
        .fn()
        .mockRejectedValue(errorStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.getGroupById()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("updateGroup", () => {
    let req: Request;
    let groupId: string;
    let groupStub: Group;

    beforeEach(() => {
      groupId = "group Id";
      groupStub = {} as Group;
      req = getMockReq({ params: { id: groupId }, body: groupStub });
    });

    it("should call updateGroup from GroupService", async () => {
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.updateGroup()(req, res, next);

      expect(GroupServiceMock.prototype.updateGroup).toHaveBeenCalledWith(
        groupId,
        groupStub
      );
    });

    it("should call next with NotFoundError if group is not found", async () => {
      GroupServiceMock.prototype.updateGroup = jest
        .fn()
        .mockResolvedValue(null);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.updateGroup()(req, res, next);

      expect(next).toHaveBeenCalledWith(new NotFoundErrorMock(""));
    });

    it("should respond with the updatedGroup", async () => {
      GroupServiceMock.prototype.updateGroup = jest
        .fn()
        .mockResolvedValue(groupStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.updateGroup()(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(groupStub);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      GroupServiceMock.prototype.updateGroup = jest
        .fn()
        .mockRejectedValue(errorStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.updateGroup()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("deleteGroup", () => {
    let req: Request;
    let groupId: string;

    beforeEach(() => {
      groupId = "group Id";
      req = getMockReq({ params: { id: groupId } });
    });

    it("should call deleteGroupById from GroupService", async () => {
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.deleteGroup()(req, res, next);

      expect(GroupServiceMock.prototype.deleteGroupById).toHaveBeenCalledWith(
        groupId
      );
    });

    it("should respond with the NO_CONTENT", async () => {
      GroupServiceMock.prototype.deleteGroupById = jest.fn();
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.deleteGroup()(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      GroupServiceMock.prototype.deleteGroupById = jest
        .fn()
        .mockRejectedValue(errorStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.deleteGroup()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("getGroups", () => {
    let req: Request;

    beforeEach(() => {
      req = getMockReq();
    });

    it("should call getGroups from GroupService", async () => {
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.getGroups()(req, res, next);

      expect(GroupServiceMock.prototype.getGroups).toHaveBeenCalled();
    });

    it("should respond with the group array", async () => {
      const groupsStub = [] as Group[];
      GroupServiceMock.prototype.getGroups = jest
        .fn()
        .mockResolvedValue(groupsStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.getGroups()(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(groupsStub);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      GroupServiceMock.prototype.getGroups = jest
        .fn()
        .mockRejectedValue(errorStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.getGroups()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("addGroup", () => {
    let req: Request;
    const groupStub = {} as Group;

    beforeEach(() => {
      req = getMockReq({ body: groupStub });
    });

    it("should call addGroup from GroupService", async () => {
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.addGroup()(req, res, next);

      expect(GroupServiceMock.prototype.addGroup).toHaveBeenCalledWith(
        groupStub
      );
    });

    it("should respond with the added group", async () => {
      GroupServiceMock.prototype.addGroup = jest
        .fn()
        .mockResolvedValue(groupStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.addGroup()(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(res.json).toHaveBeenCalledWith(groupStub);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      GroupServiceMock.prototype.addGroup = jest
        .fn()
        .mockRejectedValue(errorStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.addGroup()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });

  describe("addUsersToGroup", () => {
    let req: Request;
    const groupId = "group Id";
    const userIdsStub = [];

    beforeEach(() => {
      req = getMockReq({
        params: { id: groupId },
        body: { userIds: JSON.stringify(userIdsStub) },
      });
    });

    it("should call addUsersToGroup from GroupService", async () => {
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.addUsersToGroup()(req, res, next);

      expect(GroupServiceMock.prototype.addUsersToGroup).toHaveBeenCalledWith(
        groupId,
        userIdsStub
      );
    });

    it("should respond with NO_CONTENT", async () => {
      GroupServiceMock.prototype.addUsersToGroup = jest.fn();
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.addUsersToGroup()(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
    });

    it("should call next with the error in case an error", async () => {
      const errorStub = new Error("some error");
      GroupServiceMock.prototype.addUsersToGroup = jest
        .fn()
        .mockRejectedValue(errorStub);
      const groupController = new GroupController(new GroupServiceMock());

      await groupController.addUsersToGroup()(req, res, next);

      expect(next).toHaveBeenCalledWith(errorStub);
    });
  });
});
