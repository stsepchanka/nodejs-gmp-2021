import { Op } from "sequelize";

import { IUser } from "../models";
import { User } from "../models";

export class UserService {
  async getUsers(): Promise<User[]> {
    return await User.findAll({ where: { isDeleted: false } });
  }

  async getUserByID(userId: string): Promise<User> {
    const user = await User.findOne({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw `User with id=${userId} is not found`;
    }

    return user;
  }

  async addUser(user: IUser): Promise<User> {
    await this.checkUserLogin(user);
    const newUser = await User.create(user);
    return newUser;
  }

  async updateUser(userId: string, user: IUser): Promise<User> {
    await this.checkUserLogin(user, userId);
    await User.update(user, { where: { id: userId } });
    return await this.getUserByID(userId);
  }

  async deleteUserById(userId: string): Promise<void> {
    await User.update({ isDeleted: true }, { where: { id: userId } });
  }

  async getAutoSuggestUsers(
    loginSubstring: string,
    limit: number
  ): Promise<User[]> {
    return await User.findAll({
      where: { isDeleted: false, login: { [Op.like]: `%${loginSubstring}%` } },
      order: ["login"],
      limit,
    });
  }

  private async checkUserLogin(user: IUser, userId?: string): Promise<void> {
    const userWithSameLogin = await User.findOne({
      where: { login: user.login, isDeleted: false },
    });

    if (
      userWithSameLogin &&
      (!userId || userWithSameLogin.get("id") !== userId)
    ) {
      throw `User with login=${user.login} already exists`;
    }
  }
}
