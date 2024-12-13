// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { username: string; email: string; password: string },
    @Res() response: Response,
  ) {
    const user = await this.usersService.createUser(
      body.username,
      body.email,
      body.password,
    );
    if (user) {
      const { access_token, refresh_token } = await this.authService.login(
        body.email,
        body.password,
      );

      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return response.send({ user, access_token });
    }

    return response
      .send({ error: 'Неудачная попытка регистрации' })
      .status(404);
  }

  @HttpCode(HttpStatus.OK) @Post('login') async login(
    @Body() body: { email: string; password: string },
    @Res() response: Response,
  ) {
    const { user, access_token, refresh_token } = await this.authService.login(
      body.email,
      body.password,
    );

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return response.send({ user, access_token });
  }

  //https://docs.nestjs.com/techniques/cookies#creating-a-custom-decorator-cross-platform
  @Get('refresh-token') async refreshToken(@Req() request: Request) {
    const refreshToken = request.cookies['refresh_token'];
    const response = await this.authService.refreshToken(refreshToken);
    return response;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() response: Response) {
    // Удаляем refresh_token из cookie
    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return response.send({ message: 'Logged out successfully' });
  }
}
