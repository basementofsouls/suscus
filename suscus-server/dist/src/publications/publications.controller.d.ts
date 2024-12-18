import { PublicationsService } from './publications.service';
export declare class PublicationsController {
    private readonly pubService;
    constructor(pubService: PublicationsService);
    getMyPublications(query: any): any;
    createPublication(req: any, body: {
        publication: {
            title: string;
            url: string;
        };
    }): any;
    updatePublication(req: any, body: {
        data: {
            id: string;
            title: string;
            url: string;
            artist_id: string;
        };
    }): any;
    deletePublications(req: any, query: any): any;
}
