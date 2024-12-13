import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/constants/constants';
import IUser from 'src/models/IUser';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(
    email: string,
    pass: string,
  ): Promise<{ user: IUser; access_token: string; refresh_token: string }> {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn, // Access token expires in 15 minutes
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.expiresInRefrash, // Refresh token expires in 7 days
    });
    return {
      user,
      access_token,
      refresh_token,
    };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ access_token: string; user: IUser }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

      const user = await this.usersService.findById(payload.id);
      const newPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const newAccessToken = await this.jwtService.signAsync(newPayload, {
        secret: jwtConstants.secret,
        expiresIn: '15m',
      });

      return {
        access_token: newAccessToken,
        user: { ...newPayload, avatar: user.avatar } as IUser,
      };
    } catch (e: any) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
