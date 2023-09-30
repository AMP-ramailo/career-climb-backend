import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserSkill } from 'src/helpers/linking_entities/user-skill.entity';
import { User } from 'src/user/user.entity';

@Table({ tableName: 'skills', timestamps: false })
export class Skill extends Model<Skill> {
  @PrimaryKey
  @AutoIncrement
  @Column
  skill_id: number;

  @Column
  skill_name: string;

  @BelongsToMany(() => User, () => UserSkill)
  users: User[];
}
