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
    createCategorie(data: any): Promise<any>;
    updateCategorie(data: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        name: string;
    }>;
    deleteCategorie(id: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        name: string;
    }>;
}
