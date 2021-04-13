import { IUser } from "../models";
import { UserRepository } from "../repositories";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(): IUser[] {
    return this.userRepository.getUsers();
  }

  getUserByID(userId: string): IUser {
    return this.userRepository.getUserByID(userId);
  }

  addUser(user: IUser): IUser {
    return this.userRepository.addUser(user);
  }

  updateUser(userId: string, user: IUser): IUser {
    return this.userRepository.updateUser(userId, user);
  }

  deleteUserById(id: string): void {
    this.userRepository.deleteUserById(id);
  }

  getAutoSuggestUsers(loginSubstring: string, limit: number): IUser[] {
    const users = this.userRepository.getUsers();

    return users
      .filter((user) => user.login.includes(loginSubstring))
      .sort(this.sortUsersBy("login"))
      .slice(0, limit);
  }

  private sortUsersBy(
    property: string | number
  ): (user1: IUser, user2: IUser) => number {
    return (user1: IUser, user2: IUser) => {
      if (user1[property] < user2[property]) {
        return -1;
      } else if (user1[property] > user2[property]) {
        return 1;
      } else {
        return 0;
      }
    };
  }
}
