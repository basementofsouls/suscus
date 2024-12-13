import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import IUser from 'src/models/IUser';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        avatar: string | null;
        role: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    login(email: string, pass: string): Promise<{
        user: IUser;
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        user: IUser;
    }>;
}
