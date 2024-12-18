import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(AuthGuard)
  @Get('user')
  getUser(@Query('id') id: string) {
    return this.userService.findById(parseInt(id));
  }
  @UseGuards(AuthGuard)
  @Post('change')
  async updatePrtofile(@Request() req, @Body() body: any) {
    await this.userService.updateProfile(req.user.id, body);
    const refreshToken = req.cookies['refresh_token'];
    return await this.authService.refreshToken(refreshToken);
  }
}
