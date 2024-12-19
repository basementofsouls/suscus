import { PrismaService } from 'prisma/prisma.service';
export declare class PublicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    getPublications(query: any): Promise<any>;
    createPublication(data: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        artist_id: number;
        title: string;
        image_url: string;
        description: string | null;
    }>;
    updatePublication(data: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        artist_id: number;
        title: string;
        image_url: string;
        description: string | null;
    }>;
    deletePublication(query: any): Promise<any>;
}
