import { CommentsService } from './comments.service';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    getComments(query: any): any;
    createComment(req: any, body: {
        data: {
            publicationId: string;
            content: string;
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
    deleteComment(req: any, query: any): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        publication_id: number;
        user_id: number;
        content: string;
    } | {
        message: string;
    }>;
}
