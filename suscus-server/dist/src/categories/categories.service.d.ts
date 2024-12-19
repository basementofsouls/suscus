import { PrismaService } from 'prisma/prisma.service';
export declare class СategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllCategories(): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        name: string;
    }[]>;
    getCurrentCategories(id: number): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        name: string;
    }>;
    getPublicationCategories(query: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        publication_id: number;
        category_id: number;
    }[]>;
    createCategorie(data: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        name: string;
    }>;
    updateCategorie(data: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        name: string;
    }>;
    deleteCategorie(query: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        name: string;
    }>;
}
