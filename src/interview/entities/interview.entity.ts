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
import { Applicant } from 'src/applicant/entities/applicant.entity';
import { InterviewStatus } from 'src/helpers';
import { Interviewer } from 'src/interviewer/entities/interviewer.entity';

@Table({ tableName: 'interview_sessions', timestamps: true })
export class Interview extends Model<Interview> {
  @PrimaryKey
  @AutoIncrement
  @Column
  session_id: number;

  @Column({ type: DataType.DATEONLY })
  interview_date: Date;

  @Column
  interview_time: number;

  @Column({
    type: DataType.ENUM(...Object.values(InterviewStatus)),
  })
  interview_status: string;

  @Column
  payment_id: string;

  @ForeignKey(() => Interviewer)
  interviewer_id: number;

  @ForeignKey(() => Applicant)
  applicant_id: number;

  @BelongsTo(() => Interviewer)
  interviewer: Interviewer;

  @BelongsTo(() => Applicant)
  applicant: Applicant;
}
