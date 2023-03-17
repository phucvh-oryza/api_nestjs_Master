import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enum/role/role.enum';
import { Roles } from './role.entity';
import { Products } from './product.entity';
import { Images } from './image.entity';
import { Categogys } from './categogy.entity';
@Entity('Users')
export class Users {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  ID: number;

  @ApiProperty()
  @Column()
  Password: string;

  @ApiProperty()
  @Column()
  Fullname: string;

  @ApiProperty()
  @Column()
  Email: string;

  @ApiProperty()
  @Column()
  Birthday: string;

  @ManyToOne(() => Roles, (Role) => Role.Users)
  @JoinColumn({ name: 'RoleID' })
  Roles: Role;

  @ApiProperty()
  @Column({ name: 'RoleID' })
  RoleID: string;

  @ApiProperty()
  @Column()
  Status: boolean;

  @ApiProperty()
  @CreateDateColumn()
  CreatedAt: Date;

  @OneToMany(() => Products, (Product) => Product.ID)
  Products: Products[];

  @OneToMany(() => Images, (Image) => Image.ID)
  Images: Images[];

  @ApiProperty()
  @OneToMany(() => Categogys, (Categogy) => Categogy.ID)
  Categogys: Categogys[];
}
