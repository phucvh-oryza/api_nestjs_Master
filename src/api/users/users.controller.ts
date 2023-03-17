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
import { Users } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/dto/updateUserDto ';
import { CreateUserDto } from 'src/dto/createUserDto';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('all')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'List all users' })
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('testadmin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('testuser')
  onlyUser(@Request() req) {
    return req.user;
  }
  @Post('signup')
  create(@Body() createUserDto: Users) {
    // createUserDto.createdAt = new Date();SS
    return this.usersService.signup(createUserDto);
  }

  @Put('update/:Email')
  async update(
    @Param('Email') Email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.updateUser(Email, updateUserDto);
  }

  @Delete('delete/:Email')
  deleteUser(@Param('Email') Email: string) {
    return this.usersService.delete(Email);
  }
}
