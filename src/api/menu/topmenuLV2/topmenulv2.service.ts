import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTopMenuLV2Dto } from 'src/dto/updateTopMenuLv2Dto';
import { TopMenuLV2s } from 'src/entities/topmenulv2.entity';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class TopMenuLV2Service {
  constructor(
    @InjectRepository(TopMenuLV2s)
    private readonly topmenulv2Repo: Repository<TopMenuLV2s>,
  ) {}

  async findAll(): Promise<TopMenuLV2s[]> {
    return await this.topmenulv2Repo.find();
  }

  async findOne(ID: string): Promise<TopMenuLV2s> {
    return await this.topmenulv2Repo.findOneBy({ ID: ID });
  }

  async create(menu: TopMenuLV2s): Promise<TopMenuLV2s> {
    const topmenu = await this.findOne(menu.ID);
    menu.Status = true;
    if (topmenu) {
      throw new ConflictException('ID already exists');
    } else {
      return await this.topmenulv2Repo.save(menu);
    }
  }

  //   async update(username: string, user: Users): Promise<UpdateResult> {
  //     return await this.usersRepo.update(user.username, user);
  //   }
  async update(
    ID: string,
    updateTopMenuLV2sDto: UpdateTopMenuLV2Dto,
  ): Promise<TopMenuLV2s> {
    const menu = await this.findOne(ID);
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    if (updateTopMenuLV2sDto.Name) {
      menu.Name = updateTopMenuLV2sDto.Name;
    }
    if (updateTopMenuLV2sDto.Status) {
      menu.Status = Boolean(updateTopMenuLV2sDto.Status);
    }

    return await this.topmenulv2Repo.save(menu);
  }

  async delete(ID: string): Promise<DeleteResult> {
    return await this.topmenulv2Repo.delete({ ID: ID });
  }
}
