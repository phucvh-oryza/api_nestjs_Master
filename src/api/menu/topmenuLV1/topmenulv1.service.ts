import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTopMenuLV1Dto } from 'src/dto/updateTopMenuLv1Dto';
import { TopMenuLV1s } from 'src/entities/topmenulv1.entity';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class TopMenuLV1Service {
  constructor(
    @InjectRepository(TopMenuLV1s)
    private readonly menuRepo: Repository<TopMenuLV1s>,
  ) {}

  async findAll(): Promise<TopMenuLV1s[]> {
    return await this.menuRepo.find();
  }

  async findOne(ID: string): Promise<TopMenuLV1s> {
    return await this.menuRepo.findOneBy({ ID: ID });
  }

  async create(menu: TopMenuLV1s): Promise<TopMenuLV1s> {
    const users = await this.findOne(menu.ID);
    menu.Status = true;
    if (users) {
      throw new ConflictException('ID already exists');
    } else {
      return await this.menuRepo.save(menu);
    }
  }

  //   async update(username: string, user: Users): Promise<UpdateResult> {
  //     return await this.usersRepo.update(user.username, user);
  //   }
  async update(
    ID: string,
    updateTopMenuLV1sDto: UpdateTopMenuLV1Dto,
  ): Promise<TopMenuLV1s> {
    const categogy = await this.findOne(ID);
    if (!categogy) {
      throw new NotFoundException('Menu not found');
    }
    if (updateTopMenuLV1sDto.Name) {
      categogy.Name = updateTopMenuLV1sDto.Name;
    }
    if (updateTopMenuLV1sDto.Status) {
      categogy.Status = Boolean(updateTopMenuLV1sDto.Status);
    }

    return await this.menuRepo.save(categogy);
  }

  async delete(ID: string): Promise<DeleteResult> {
    return await this.menuRepo.delete({ ID: ID });
  }
}
