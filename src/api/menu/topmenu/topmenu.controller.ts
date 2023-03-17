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
import { UpdateMenuDto } from 'src/dto/updateTopMenuDto';
import { TopMenus } from 'src/entities/topmenu.entity';
import { TopMenuService } from './topmenu.service';

@ApiTags('TopMenu')
@Controller('topmenu')
export class TopMenuController {
  constructor(
    private authService: AuthService,
    private readonly menuService: TopMenuService,
  ) {}

  @Get('all')
  @ApiOkResponse({ description: 'List all menu' })
  findAll(): Promise<TopMenus[]> {
    return this.menuService.findAll();
  }

  @Post('create')
  create(@Body() role: TopMenus) {
    return this.menuService.create(role);
  }

  @Put('update/:ID')
  async update(
    @Param('ID') ID: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<TopMenus> {
    return this.menuService.update(ID, updateMenuDto);
  }

  @Delete('delete/:ID')
  deleteUser(@Param('ID') ID: string) {
    return this.menuService.delete(ID);
  }
}
