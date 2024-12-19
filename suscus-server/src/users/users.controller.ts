import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly webDavService: FileService,
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
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 500 * 1024 * 1024 }, // Лимит 500 МБ
    }),
  )
  async updatePrtofile(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const link = await this.webDavService.uploadFile(file);

    await this.userService.updateProfile(req.user.id, {
      ...body,
      avatar: link,
    });
    const refreshToken = req.cookies['refresh_token'];
    return await this.authService.refreshToken(refreshToken);
  }
}
