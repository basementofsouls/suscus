import { СategoriesService } from './categories.service';
export declare class СategoriesController {
    private readonly сategoriesService;
    constructor(сategoriesService: СategoriesService);
    getAllCategories(): any;
    getPublicationCategories(query: any): any;
    createCategorie(req: any, body: {
        data: {
            name: string;
        };
    }): any;
    updareCategorie(req: any, body: {
        id: string;
        name: string;
    }): any;
    deleteCategorie(req: any, query: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        name: string;
    } | {
        message: string;
    }>;
}
