import { PrismaService } from 'prisma/prisma.service';
export declare class CommentsService {
    private prisma;
    constructor(prisma: PrismaService);
    getComment(id: any): Promise<({
        users: {
            username: string;
        };
    } & {
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        publication_id: number;
        user_id: number;
        content: string;
    })[]>;
    getComments(query: any): Promise<({
        users: {
            username: string;
        };
    } & {
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        publication_id: number;
        user_id: number;
        content: string;
    })[]>;
    createComment(data: any): Promise<{
        users: {
            username: string;
        };
    } & {
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        publication_id: number;
        user_id: number;
        content: string;
    }>;
    updateComment(data: {
        id: number;
        content?: string;
        publication_id?: number;
    }): Promise<{
        users: {
            username: string;
        };
    } & {
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        publication_id: number;
        user_id: number;
        content: string;
    }>;
    deleteComment(query: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        publication_id: number;
        user_id: number;
        content: string;
    }>;
}
