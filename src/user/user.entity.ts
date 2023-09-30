import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length:200})
  name: string;

  @Column({type:'varchar', length:200, unique:true})
  email: string;

  @Column({type:'varchar', length:200})
  image_url: string;
}