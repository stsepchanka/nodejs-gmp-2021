import { v4 as uuidv4 } from "uuid";

import { IUser } from "../models";

export class UserRepository {
  private users = [] as IUser[];

  getUsers(): IUser[] {
    return this.users.filter((user) => !user.isDeleted);
  }

  getUserByID(userId: string): IUser {
    const index = this.findUserIndex(userId);

    return this.users[index];
  }

  getUserByLogin(login: string): IUser {
    const user = this.users.find((u) => u.login === login);

    return user;
  }

  addUser(user: IUser): IUser {
    if (this.getUserByLogin(user.login)) {
      throw `User with login='${user.login}' already exists`;
    }

    const newUser = { ...user, id: uuidv4(), isDeleted: false };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(userId: string, user: IUser): IUser {
    const index = this.findUserIndex(userId);

    this.users[index] = { ...user, id: userId };

    return this.users[index];
  }

  deleteUserById(id: string): void {
    const index = this.findUserIndex(id);

    this.users[index].isDeleted = true;
  }

  private findUserIndex(id: string): number {
    const index = this.getUsers().findIndex((user) => user.id === id);

    if (index > -1) {
      return index;
    }

    throw `User with id=${id} is not found`;
  }
}
