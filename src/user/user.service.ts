import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
    });
  }

  async createUser(user: Partial<User>): Promise<User> {
    return User.create(user);
  }
}
