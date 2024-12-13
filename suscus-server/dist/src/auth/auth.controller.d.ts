import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: {
        username: string;
        email: string;
        password: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
    login(body: {
        email: string;
        password: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(request: Request): Promise<{
        access_token: string;
        user: import("../models/IUser").default;
    }>;
    logout(response: Response): Promise<Response<any, Record<string, any>>>;
}
