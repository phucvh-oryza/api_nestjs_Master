import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Users } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Roles } from '../../entities/role.entity';
import { UpdateRoleDto } from '../../dto/updateRoleDto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Roles)
    private readonly roleRepo: Repository<Roles>,
  ) {}

  async findAll(): Promise<Roles[]> {
    return await this.roleRepo.find();
  }

  async findOne(ID: string): Promise<Roles> {
    return await this.roleRepo.findOneBy({ ID: ID });
  }

  async signup(role: Roles): Promise<Roles> {
    const users = await this.findOne(role.ID);
    role.Status = true;
    if (users) {
      throw new ConflictException('RolesID already exists');
    } else {
      return await this.roleRepo.save(role);
    }
  }

  //   async update(username: string, user: Users): Promise<UpdateResult> {
  //     return await this.usersRepo.update(user.username, user);
  //   }
  async update(ID: string, updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const role = await this.findOne(ID);
    if (!role) {
      throw new NotFoundException('Role not found!');
    }
    if (updateRoleDto.Name) {
      role.Name = updateRoleDto.Name;
    }
    if (updateRoleDto.Status) {
      role.Status = Boolean(updateRoleDto.Status);
    }
    role;

    return await this.roleRepo.save(role);
  }

  async delete(ID: string): Promise<DeleteResult> {
    return await this.roleRepo.delete({ ID: ID });
  }
}
