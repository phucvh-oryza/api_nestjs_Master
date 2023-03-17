import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categogys } from './categogy.entity';
import { Images } from './image.entity';
import { Users } from './user.entity';

@Entity('Products')
export class Products {
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
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price: number;

  @ApiProperty()
  @Column()
  Quantity: number;

  @ApiProperty()
  @Column()
  Datemade: string;

  @ManyToOne(() => Categogys, (Categogy) => Categogy.Products)
  @JoinColumn({ name: 'CategogyID' })
  Categogys: Categogys;

  @ApiProperty()
  @Column({ name: 'CategogyID' })
  CategogyID: string;

  @ManyToOne(() => Users, (User) => User.Products)
  @JoinColumn({ name: 'UserID' })
  Users: Users;

  @ApiProperty()
  @Column({ name: 'UserID' })
  UserID: number;

  @ApiProperty()
  @Column()
  Status: boolean;

  @ApiProperty()
  @CreateDateColumn()
  CreatedAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  UpdatedAt: Date;

  @OneToMany(() => Images, (Image) => Image.ID)
  Images: Images[];
}
