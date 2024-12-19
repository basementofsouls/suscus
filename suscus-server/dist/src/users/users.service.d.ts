import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    jwtService: any;
    constructor(prisma: PrismaService);
    createUser(username: string, email: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        avatar: string | null;
        role: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        avatar: string | null;
        role: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    findById(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        avatar: string | null;
        role: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    updateProfile(id: number, profile: any): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        avatar: string | null;
        role: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
}
