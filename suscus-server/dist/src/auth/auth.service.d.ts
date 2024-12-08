import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        avatar: string | null;
        role: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
