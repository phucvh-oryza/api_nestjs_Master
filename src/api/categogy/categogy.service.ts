import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Categogys } from '../../entities/categogy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UpdateCategogyDto } from '../../dto/updateCategogyDto';
import { Users } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CategogyService {
  constructor(
    @InjectRepository(Categogys)
    private readonly categogyRepo: Repository<Categogys>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Categogys[]> {
    return await this.categogyRepo.find();
  }

  async findOne(ID: string): Promise<Categogys> {
    return await this.categogyRepo.findOneBy({ ID: ID });
  }

  async signup(categogy: Categogys): Promise<Categogys> {
    const users = await this.findOne(categogy.ID);
    categogy.Status = true;
    if (users) {
      throw new ConflictException('Category already exists');
    } else {
      return await this.categogyRepo.save(categogy);
    }
  }

  //   async update(username: string, user: Users): Promise<UpdateResult> {
  //     return await this.usersRepo.update(user.username, user);
  //   }
  async update(
    ID: string,
    updateCategogyDto: UpdateCategogyDto,
  ): Promise<Categogys> {
    const categogy = await this.findOne(ID);
    const user = await this.usersService.findbyID(updateCategogyDto.UserID);
    if (!categogy) {
      throw new NotFoundException('Categogy not found');
    }
    if (!user) {
      throw new NotFoundException('UserID not found');
    }
    if (updateCategogyDto.Name) {
      categogy.Name = updateCategogyDto.Name;
    }
    if (updateCategogyDto.Description) {
      categogy.Description = updateCategogyDto.Description;
    }
    // if (updateCategogyDto.UserID) {
    //   categogy.UserID = updateCategogyDto.UserID;
    // }
    if (updateCategogyDto.Status) {
      categogy.Status = Boolean(updateCategogyDto.Status);
    }

    return await this.categogyRepo.save(categogy);
  }

  async delete(ID: string): Promise<DeleteResult> {
    return await this.categogyRepo.delete({ ID: ID });
  }
}
