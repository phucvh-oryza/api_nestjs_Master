import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './product.entity';
import { Users } from './user.entity';

@Entity('Images')
export class Images {
  @ApiProperty()
  @PrimaryColumn()
  ID: string;

  @ApiProperty()
  @Column()
  Name: string;

  @ApiProperty()
  @Column()
  Url: string;

  @ApiProperty()
  @Column()
  Size: number;

  @ApiProperty()
  @Column()
  Type: string;

  @ManyToOne(() => Products, (Product) => Product.Images)
  @JoinColumn({ name: 'ProductID' })
  Products: Products;

  @ApiProperty()
  @Column({ name: 'ProductID' })
  ProductID: string;

  @ManyToOne(() => Users, (User) => User.Images)
  @JoinColumn({ name: 'UserID' })
  Users: Users;

  @ApiProperty()
  @Column({ name: 'UserID' })
  UserID: number;

  @ApiProperty()
  @CreateDateColumn()
  CreatedAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  UpdatedAt: Date;
}
