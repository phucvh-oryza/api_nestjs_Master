import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Roles } from '../../entities/role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
