import { Op } from "sequelize";
import { IncorrectRequestToDBError } from "../errors";

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

    return user?.toDomain() || null;
  }

  async getUserByLogin(login: string): Promise<IUser> {
    const user = await User.findOne({
      where: { login, isDeleted: false },
    });

    return user?.toDomain() || null;
  }

  async getUserByLoginAndPassword(
    login: string,
    password: string
  ): Promise<IUser> {
    const user = await User.findOne({
      where: { login, password, isDeleted: false },
    });

    return user?.toDomain() || null;
  }

  async addUser(user: IUser): Promise<IUser> {
    const userWithSameLogin = await this.getUserByLogin(user.login);

    if (!userWithSameLogin) {
      const newUser = await User.create(user);
      return newUser.toDomain();
    }

    throw new IncorrectRequestToDBError(
      `User with login=${user.login} already exists`
    );
  }

  async updateUser(userId: string, user: IUser): Promise<IUser> {
    const userWithSameLogin = await this.getUserByLogin(user.login);

    if (!userWithSameLogin || userWithSameLogin.id === userId) {
      await User.update(user, { where: { id: userId } });
      return await this.getUserByID(userId);
    }

    throw new IncorrectRequestToDBError(
      `User with login=${user.login} already exists`
    );
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
