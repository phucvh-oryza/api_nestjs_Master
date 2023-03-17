import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/enum/role/role.enum';
import { Categogys } from 'src/entities/categogy.entity';
import { CategogyService } from './categogy.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCategogyDto } from 'src/dto/updateCategogyDto';

@ApiTags('Categogys')
@Controller('categogy')
export class CategogyController {
  constructor(
    private authService: AuthService,
    private readonly categogyService: CategogyService,
  ) {}

  @Get('all')
  @ApiOkResponse({ description: 'List all categogy' })
  findAll(): Promise<Categogys[]> {
    return this.categogyService.findAll();
  }

  @Post('create')
  create(@Body() categogys: Categogys) {
    return this.categogyService.signup(categogys);
  }

  @Put('update/:ID')
  async update(
    @Param('ID') ID: string,
    @Body() updateCategogyDto: UpdateCategogyDto,
  ): Promise<Categogys> {
    return this.categogyService.update(ID, updateCategogyDto);
  }

  @Delete('delete/:ID')
  deleteUser(@Param('ID') ID: string) {
    return this.categogyService.delete(ID);
  }
}
