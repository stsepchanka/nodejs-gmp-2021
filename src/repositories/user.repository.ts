import { v4 as uuidv4 } from "uuid";

import { User } from "../models";

export class UserRepository {
  private users = [] as User[];

  getUsers(): User[] {
    return this.users.filter((user) => !user.isDeleted);
  }

  getUserByID(userId: string): User {
    const index = this.findUserIndex(userId);

    return this.users[index];
  }

  addUser(user: User): User {
    if (this.users.some((u) => u.login === user.login)) {
      throw `User with login='${user.login}' already exists`;
    }

    const newUser = { ...user, id: uuidv4(), isDeleted: false };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(userId: string, user: User): User {
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
