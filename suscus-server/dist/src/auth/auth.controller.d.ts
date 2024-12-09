import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: {
        username: string;
        email: string;
        password: string;
    }): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        avatar: string | null;
        role: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    login(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
}
