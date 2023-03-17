import { Module } from '@nestjs/common';
import { CategogyService } from './categogy.service';
import { CategogyController } from './categogy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categogys } from '../../entities/categogy.entity';
import { Users } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categogys, Users])],
  providers: [CategogyService, UsersService],
  exports: [CategogyService, UsersService],
})
export class CategogyModule {}
