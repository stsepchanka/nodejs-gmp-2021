import { sequelize } from "../db/connectDB";
import { IncorrectRequestToDBError } from "../errors";
import { IGroup } from "../models";
import { Group } from "../models";

export class GroupService {
  async getGroups(): Promise<IGroup[]> {
    return await (await Group.findAll()).map((group) => group.toDomain());
  }

  async getGroupByID(groupId: string): Promise<IGroup> {
    const group = await Group.findOne({
      where: { id: groupId },
    });

    return group?.toDomain() || null;
  }

  async getGroupByName(groupName: string): Promise<IGroup> {
    const group = await Group.findOne({
      where: { name: groupName },
    });

    return group?.toDomain() || null;
  }

  async addGroup(group: IGroup): Promise<IGroup> {
    const groupWithSameName = await this.getGroupByName(group.name);

    if (!groupWithSameName) {
      const newGroup = await Group.create(group);
      return newGroup.toDomain();
    }

    throw new IncorrectRequestToDBError(
      `Group with name=${group.name} already exists`
    );
  }

  async updateGroup(groupId: string, group: IGroup): Promise<IGroup> {
    const groupWithSameName = await this.getGroupByName(group.name);

    if (!groupWithSameName || groupWithSameName.id === groupId) {
      await Group.update(group, { where: { id: groupId } });
      return await this.getGroupByID(groupId);
    }

    throw new IncorrectRequestToDBError(
      `Group with name=${group.name} already exists`
    );
  }

  async deleteGroupById(groupId: string): Promise<void> {
    await Group.destroy({ where: { id: groupId } });
  }

  async addUsersToGroup(groupId: string, userIds: string[]): Promise<void> {
    const t = await sequelize.transaction();

    try {
      const group = await Group.findOne({
        where: { id: groupId },
      });

      await group["addUsers"](userIds);

      await t.commit();
    } catch (error) {
      await t.rollback();

      throw new IncorrectRequestToDBError(
        `Users were not added to the groupId="${groupId}"`
      );
    }
  }
}
