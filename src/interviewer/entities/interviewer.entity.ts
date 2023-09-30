import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Interview } from 'src/interview/entities/interview.entity';
import { User } from 'src/user/user.entity';

@Table({ tableName: 'applicant_profile', timestamps: true })
export class Interviewer extends Model<Interviewer> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  experience: number;

  @Column({ defaultValue: 0 })
  interview_count: number;

  @Column
  address: string;

  @Column
  phone: string;

  @Column
  current_company: string;

  @Column
  price: number;

  @Column({ type: DataType.DATEONLY })
  dob: Date;

  @Column({ defaultValue: 0 })
  rating: number;

  @ForeignKey(() => User)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Interview)
  interviews: Interview[];
}
