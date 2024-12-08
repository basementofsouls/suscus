import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller("auth")
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getHello(): string {
    return "1"
  }
  @Get('hello2')
  getHello2(): string {
    return "2";
  }
}
