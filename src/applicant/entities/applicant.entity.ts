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

@Table({ tableName: 'applicant_profile', timestamps: true })
export class Applicant extends Model<Applicant> {
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
  linkedin_url: string;

  @Column
  github_url: string;

  @Column({ type: DataType.DATEONLY })
  dob: Date;

  @Column({ defaultValue: 0 })
  rating: number;

  @ForeignKey(() => User)
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
