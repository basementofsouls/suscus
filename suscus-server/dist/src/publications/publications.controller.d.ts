import { PublicationsService } from './publications.service';
import { FileService } from 'src/file/file.service';
export declare class PublicationsController {
    private readonly pubService;
    private readonly fileService;
    constructor(pubService: PublicationsService, fileService: FileService);
    getMyPublications(query: any): any;
    createPublication(req: any, file: Express.Multer.File, body: {
        title: string;
        description: string;
        categories: string;
    }): Promise<{
        id: number;
        artist_id: number;
        title: string;
        image_url: string;
        description: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    updatePublication(req: any, body: {
        data: {
            id: string;
            title: string;
            url: string;
            artist_id: string;
        };
    }): any;
    deletePublications(req: any, query: any): Promise<any>;
}
