import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('TopMenus')
export class TopMenus {
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
  @Column()
  TopMenuLV1ID: boolean;

  @ApiProperty()
  @CreateDateColumn()
  CreatedAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  UpdatedAt: Date;
}
