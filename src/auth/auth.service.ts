import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../api/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //   async validateUser(username: string, pass: string): Promise<any> {
  //     const user = await this.usersService.findOne(username);
  //     if (user && user.password === pass) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (await bcrypt.compare(password, user.Password)) {
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = {

      Email: user.Email,
      RoleID: user.RoleID,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
