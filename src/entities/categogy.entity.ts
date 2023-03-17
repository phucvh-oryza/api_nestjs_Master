import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './product.entity';
import { Users } from './user.entity';

@Entity('Categogys')
export class Categogys {
  @ApiProperty()
  @PrimaryColumn()
  ID: string;

  @ApiProperty()
  @Column()
  Name: string;

  @ApiProperty()
  @Column()
  Description: string;

  @ApiProperty()
  @Column()
  Status: boolean;

  @ApiProperty()
  @CreateDateColumn()
  CreatedAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  UpdatedAt: Date;

  @OneToMany(() => Products, (Product) => Product.ID)
  Products: Products[];

  @ManyToOne(() => Users, (User) => User.Categogys)
  @JoinColumn({ name: 'UserID' })
  Users: Users;

  @ApiProperty()
  @Column({ name: 'UserID' })
  UserID: number;
}
