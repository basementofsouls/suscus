import { PrismaService } from 'prisma/prisma.service';
export declare class PublicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    getPublications(query: any): any;
    createPublication(data: any): Promise<{
        id: number;
        artist_id: number;
        title: string;
        image_url: string;
        description: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    updatePublication(data: any): Promise<{
        id: number;
        artist_id: number;
        title: string;
        image_url: string;
        description: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    deletePublication(query: any): Promise<{
        id: number;
        artist_id: number;
        title: string;
        image_url: string;
        description: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
}
