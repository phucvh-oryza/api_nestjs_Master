import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Role } from '../../enum/role/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/user.entity';
import { UpdateUserDto } from 'src/dto/updateUserDto ';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepo.find();
  }

  async findOne(Email: string): Promise<Users> {
    return await this.usersRepo.findOneBy({ Email: Email });
  }

  async findbyID(ID: number): Promise<Users> {
    return await this.usersRepo.findOneBy({ ID: ID });
  }

  async signup(user: Users): Promise<Users> {
    const saltOrRounds = 10;
    const password = user.Password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    user.Password = hash;
    user.CreatedAt = new Date();
    user.Status = true;
    const users = await this.findOne(user.Email);
    if (users) {
      throw new ConflictException('Email already exists');
    } else {
      return await this.usersRepo.save(user);
    }
  }

  //   async update(username: string, user: Users): Promise<UpdateResult> {
  //     return await this.usersRepo.update(user.username, user);
  //   }
  async updateUser(
    Email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    const user = await this.findOne(Email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.Birthday) {
      user.Birthday = updateUserDto.Birthday;
    }
    if (updateUserDto.Fullname) {
      user.Fullname = updateUserDto.Fullname;
    }
    if (updateUserDto.Status) {
      user.Status = updateUserDto.Status;
    }
    if (updateUserDto.RoleID) {
      user.RoleID = updateUserDto.RoleID;
    }
    if (updateUserDto.Password) {
      user.Password = await bcrypt.hash(updateUserDto.Password, 10);
    }
    return await this.usersRepo.save(user);
  }

  async delete(Email: string): Promise<DeleteResult> {
    return await this.usersRepo.delete({ Email: Email });
  }
}
