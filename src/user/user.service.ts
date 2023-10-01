import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Applicant } from 'src/applicant/entities/applicant.entity';
import { UserType } from 'src/helpers';
import { Interviewer } from 'src/interviewer/entities/interviewer.entity';

@Injectable()
export class UsersService {
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
    });
  }
  async findById(id: number): Promise<User | null> {
    return User.findOne({
      where: { id },
    });
  }
  async createUser(user: Partial<User>): Promise<User> {
    return User.create(user);
  }

  async getUsersRoleUser(): Promise<User[]> {
    return User.findAll({ where: { role: UserType.USER }, include: Applicant });
  }
  async getUsersRoleInterviewer(): Promise<User[]> {
    return User.findAll({
      where: { role: UserType.INTERVIEWER },
      include: Interviewer,
    });
  }
}
