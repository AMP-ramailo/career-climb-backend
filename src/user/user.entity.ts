import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserType } from 'src/helpers';
import { Schedule } from '../schedule/entities/schedule.entity';
import { Applicant } from 'src/applicant/entities/applicant.entity';
import { Interviewer } from 'src/interviewer/entities/interviewer.entity';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  image_url: string;

  @Default(UserType.USER)
  @Column({
    type: DataType.ENUM(...Object.values(UserType)),
  })
  role: string;

  @HasMany(() => Schedule)
  schedules: Schedule[];

  @HasOne(() => Applicant)
  applicant: Applicant;

  @HasOne(() => Interviewer)
  interviewer: Interviewer;
}
