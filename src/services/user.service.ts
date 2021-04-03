import { User } from "../models";
import { UserRepository } from "../repositories";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(): User[] {
    return this.userRepository.getUsers();
  }

  getUserByID(userId: string): User {
    return this.userRepository.getUserByID(userId);
  }

  addUser(user: User): User {
    return this.userRepository.addUser(user);
  }

  updateUser(userId: string, user: User): User {
    return this.userRepository.updateUser(userId, user);
  }

  deleteUserById(id: string): void {
    this.userRepository.deleteUserById(id);
  }

  getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
    const users = this.userRepository.getUsers();

    return users
      .filter((user) => user.login.includes(loginSubstring))
      .sort(this.sortUsersBy("login"))
      .slice(0, limit);
  }

  private sortUsersBy(
    property: string | number
  ): (user1: User, user2: User) => number {
    return (user1: User, user2: User) => {
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
