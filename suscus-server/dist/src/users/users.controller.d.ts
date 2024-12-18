import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UsersService, authService: AuthService);
    getProfile(req: any): any;
    getUser(id: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        avatar: string | null;
        role: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    updatePrtofile(req: any, body: any): Promise<{
        access_token: string;
        user: import("../models/IUser").default;
    }>;
}
