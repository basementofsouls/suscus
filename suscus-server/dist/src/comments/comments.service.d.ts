import { PrismaService } from 'prisma/prisma.service';
export declare class CommentsService {
    private prisma;
    constructor(prisma: PrismaService);
    getComment(id: any): Promise<{
        id: number;
        user_id: number;
        publication_id: number;
        content: string;
        created_at: Date | null;
        updated_at: Date | null;
    }[]>;
    getComments(query: any): Promise<{
        id: number;
        user_id: number;
        publication_id: number;
        content: string;
        created_at: Date | null;
        updated_at: Date | null;
    }[]>;
    createComment(data: any): Promise<{
        id: number;
        user_id: number;
        publication_id: number;
        content: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    updateComment(data: any): Promise<{
        id: number;
        user_id: number;
        publication_id: number;
        content: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    deleteComment(query: any): Promise<{
        id: number;
        user_id: number;
        publication_id: number;
        content: string;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
}
