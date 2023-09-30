import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/user.entity';

@Table({ tableName: 'user_skill', timestamps: false })
export class UserSkill extends Model<UserSkill> {
  @PrimaryKey
  @AutoIncrement
  @Column
  user_skill_id: number;

  @Column
  skill_experience: number;

  @ForeignKey(() => User)
  user_id: number;

  @ForeignKey(() => Skill)
  skill_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Skill)
  skill: Skill;
}
