import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMenuDto } from 'src/dto/updateTopMenuDto';
import { TopMenus } from 'src/entities/topmenu.entity';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class TopMenuService {
  constructor(
    @InjectRepository(TopMenus)
    private readonly menuRepo: Repository<TopMenus>,
  ) {}

  async findAll(): Promise<TopMenus[]> {
    return await this.menuRepo.find();
  }

  async findOne(ID: string): Promise<TopMenus> {
    return await this.menuRepo.findOneBy({ ID: ID });
  }

  async create(menu: TopMenus): Promise<TopMenus> {
    const users = await this.findOne(menu.ID);
    menu.Status = true;
    if (users) {
      throw new ConflictException('RolesID already exists');
    } else {
      return await this.menuRepo.save(menu);
    }
  }

  //   async update(username: string, user: Users): Promise<UpdateResult> {
  //     return await this.usersRepo.update(user.username, user);
  //   }
  async update(ID: string, updateMenuDto: UpdateMenuDto): Promise<TopMenus> {
    const categogy = await this.findOne(ID);
    if (!categogy) {
      throw new NotFoundException('Menu not found');
    }
    if (updateMenuDto.Name) {
      categogy.Name = updateMenuDto.Name;
    }
    if (updateMenuDto.Status) {
      categogy.Status = Boolean(updateMenuDto.Status);
    }

    return await this.menuRepo.save(categogy);
  }

  async delete(ID: string): Promise<DeleteResult> {
    return await this.menuRepo.delete({ ID: ID });
  }
}
