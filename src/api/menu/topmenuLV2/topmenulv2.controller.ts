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
import { UpdateTopMenuLV2Dto } from 'src/dto/updateTopMenuLv2Dto';
import { TopMenuLV2s } from 'src/entities/topmenulv2.entity';
import { TopMenuLV2Service } from './topmenulv2.service';

@ApiTags('TopMenuLV2')
@Controller('topmenulv2')
export class TopMenuLV2Controller {
  constructor(
    private authService: AuthService,
    private readonly TopMenuLV1ervice: TopMenuLV2Service,
  ) {}

  @Get('all')
  @ApiOkResponse({ description: 'List all menu' })
  findAll(): Promise<TopMenuLV2s[]> {
    return this.TopMenuLV1ervice.findAll();
  }

  @Post('create')
  create(@Body() role: TopMenuLV2s) {
    return this.TopMenuLV1ervice.create(role);
  }

  @Put('update/:ID')
  async update(
    @Param('ID') ID: string,
    @Body() updateTopMenuLV2Dto: UpdateTopMenuLV2Dto,
  ): Promise<TopMenuLV2s> {
    return this.TopMenuLV1ervice.update(ID, updateTopMenuLV2Dto);
  }

  @Delete('delete/:ID')
  deleteUser(@Param('ID') ID: string) {
    return this.TopMenuLV1ervice.delete(ID);
  }
}
