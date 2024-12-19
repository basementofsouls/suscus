import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { FileService } from 'src/file/file.service';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    private readonly webDavService;
    constructor(userService: UsersService, authService: AuthService, webDavService: FileService);
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
    updatePrtofile(req: any, file: Express.Multer.File, body: any): Promise<{
        access_token: string;
        user: import("../models/IUser").default;
    }>;
}
