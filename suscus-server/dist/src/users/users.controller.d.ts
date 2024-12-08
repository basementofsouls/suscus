import { UsersService } from './users.service';
export declare class AppController {
    private readonly userService;
    constructor(userService: UsersService);
    getHello(): string;
    getHello2(): string;
}
