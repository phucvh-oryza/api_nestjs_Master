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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCategogyDto } from 'src/dto/updateCategogyDto';
import { RoleService } from './role.service';
import { Roles } from '../../entities/role.entity';
import { UpdateRoleDto } from '../../dto/updateRoleDto';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(
    private authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

  @Get('all')
  @ApiOkResponse({ description: 'List all role' })
  findAll(): Promise<Roles[]> {
    return this.roleService.findAll();
  }

  @Post('create')
  create(@Body() role: Roles) {
    return this.roleService.signup(role);
  }

  @Put('update/:ID')
  async update(
    @Param('ID') ID: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Roles> {
    return this.roleService.update(ID, updateRoleDto);
  }

  @Delete('delete/:ID')
  deleteUser(@Param('ID') ID: string) {
    return this.roleService.delete(ID);
  }
}
