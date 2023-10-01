import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Interview } from 'src/interview/entities/interview.entity';

@Table({ tableName: 'feedback', timestamps: false })
export class Feedback extends Model<Feedback> {
  @PrimaryKey
  @AutoIncrement
  @Column
  feedback_id: number;
  @Column
  performance_rating: number;
  @Column
  knowledge_depth_rating: number;
  @Column
  confidence_rating: number;
  @Column
  communication_skill_rating: number;
  @Column
  strength: string;
  @Column
  area_of_improvements: string;
  @Column
  suggestions: string;
  @Column
  interviewer_rating: number;
  @Column
  interviewer_remarks: string;
  @ForeignKey(() => Interview)
  interview_id: number;
  @BelongsTo(() => Interview)
  interview: Interview;
}
