import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { UpdateTopMenuLV1Dto } from 'src/dto/updateTopMenuLv1Dto';
import { TopMenuLV1s } from 'src/entities/topmenulv1.entity';
import { TopMenuLV1Service } from './topmenulv1.service';

@ApiTags('TopMenuLV1')
@Controller('topmenulv1')
export class TopMenuLV1Controller {
  constructor(
    private authService: AuthService,
    private readonly TopMenuLV1ervice: TopMenuLV1Service,
  ) {}

  @Get('all')
  @ApiOkResponse({ description: 'List all menu' })
  findAll(): Promise<TopMenuLV1s[]> {
    return this.TopMenuLV1ervice.findAll();
  }

  @Post('create')
  create(@Body() role: TopMenuLV1s) {
    return this.TopMenuLV1ervice.create(role);
  }

  @Put('update/:ID')
  async update(
    @Param('ID') ID: string,
    @Body() updateTopMenuLV1Dto: UpdateTopMenuLV1Dto,
  ): Promise<TopMenuLV1s> {
    return this.TopMenuLV1ervice.update(ID, updateTopMenuLV1Dto);
  }

  @Delete('delete/:ID')
  deleteUser(@Param('ID') ID: string) {
    return this.TopMenuLV1ervice.delete(ID);
  }
}
