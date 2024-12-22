import { OrdersService } from './orders.service';
import { FileService } from 'src/file/file.service';
export declare class OrdersController {
    private readonly ordersService;
    private readonly fileService;
    constructor(ordersService: OrdersService, fileService: FileService);
    getOrders(req: any, query: any): any;
    getArtistOrders(req: any, query: any): any;
    createOrder(req: any, file: Express.Multer.File, body: {
        artist_id: string;
        description: string;
    }): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        artist_id: number;
        description: string | null;
        user_id: number;
        reference: string | null;
        status: string;
    } | {
        message: string;
    }>;
    updareOrders(req: any, body: {
        id: string;
        status: string;
    }): any;
    deletePublications(req: any, query: any): Promise<any>;
}
