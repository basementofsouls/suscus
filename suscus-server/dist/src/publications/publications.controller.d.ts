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
}
