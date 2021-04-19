import { Op } from "sequelize";

import { IUser } from "../models";
import { User } from "../models";

export class UserService {
  async getUsers(): Promise<IUser[]> {
    return await (
      await User.findAll({ where: { isDeleted: false } })
    ).map((user) => user.toDomain());
  }

  async getUserByID(userId: string): Promise<IUser> {
    const user = await User.findOne({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw `User with id=${userId} is not found`;
    }

    return user.toDomain();
  }

  async getUserByLogin(login: string): Promise<IUser> {
    const user = await User.findOne({
      where: { login, isDeleted: false },
    });

    if (!user) {
      throw `User with login=${login} is not found`;
    }

    return user.toDomain();
  }

  async addUser(user: IUser): Promise<IUser> {
    let userWithSameLogin;
    try {
      userWithSameLogin = await this.getUserByLogin(user.login);
    } catch {
      userWithSameLogin = null;
    }

    if (!userWithSameLogin) {
      const newUser = await User.create(user);
      return newUser.toDomain();
    }

    throw `User with login=${user.login} already exists`;
  }

  async updateUser(userId: string, user: IUser): Promise<IUser> {
    let userWithSameLogin;
    try {
      userWithSameLogin = await this.getUserByLogin(user.login);
    } catch {
      userWithSameLogin = null;
    }

    if (userWithSameLogin.id === userId) {
      await User.update(user, { where: { id: userId } });
      return await this.getUserByID(userId);
    }

    throw `User with login=${user.login} already exists`;
  }

  async deleteUserById(userId: string): Promise<void> {
    await User.update({ isDeleted: true }, { where: { id: userId } });
  }

  async getAutoSuggestUsers(
    loginSubstring: string,
    limit: number
  ): Promise<IUser[]> {
    const users = await User.findAll({
      where: { isDeleted: false, login: { [Op.like]: `%${loginSubstring}%` } },
      order: ["login"],
      limit,
    });
    return users.map((user) => user.toDomain());
  }
}
