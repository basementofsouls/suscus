import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UsersService, authService: AuthService);
    getProfile(req: any): any;
    updatePrtofile(req: any, body: any): Promise<{
        access_token: string;
        user: import("../models/IUser").default;
    }>;
}
