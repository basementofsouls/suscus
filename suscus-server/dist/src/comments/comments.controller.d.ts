import { CommentsService } from './comments.service';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    getComments(query: any): any;
    createComment(req: any, body: {
        data: {
            publicationId: string;
            text: string;
        };
    }): any;
    updareComment(req: any, body: {
        data: {
            id: number;
            content: string;
            user_id: number;
            publication_id: number;
        };
    }): any;
    deleteComment(query: any): any;
}
