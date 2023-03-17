import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from './user.entity';
@Entity('Roles')
export class Roles {
  @ApiProperty()
  @PrimaryColumn()
  ID: string;

  @ApiProperty()
  @Column()
  Name: string;

  @ApiProperty()
  @Column()
  Status: boolean;

  @ApiProperty()
  @CreateDateColumn()
  CreatedAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  UpdatedAt: Date;

  @OneToMany(() => Users, (User) => User.Roles)
  Users: Users[];
}
