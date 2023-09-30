import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserType } from 'src/helpers';

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
}
