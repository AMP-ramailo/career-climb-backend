import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table({ tableName: 'interviewer_schedule', timestamps: true })
export class Schedule extends Model<Schedule> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.DATEONLY })
  availability_date: Date;

  @Column
  availability_time: number;

  @Column({ defaultValue: true })
  status: boolean;

  @ForeignKey(() => User)
  interviewer_id: number;

  @BelongsTo(() => User)
  user: User;
}
