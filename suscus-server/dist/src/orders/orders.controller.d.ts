import { OrdersService } from './orders.service';
import { FileService } from 'src/file/file.service';
export declare class OrdersController {
    private readonly ordersService;
    private readonly fileService;
    constructor(ordersService: OrdersService, fileService: FileService);
    getOrders(req: any, query: any): any;
    getArtistOrders(req: any, query: any): any;
    createOrder(req: any, file: Express.Multer.File, body: {
        artistId: string;
        description: string;
    }): Promise<{
        description: string | null;
        id: number;
        user_id: number;
        artist_id: number;
        reference: string | null;
        status: string;
        created_at: Date | null;
        updated_at: Date | null;
    } | {
        message: string;
    }>;
    updareOrders(req: any, body: {
        publication: {
            title: string;
            url: string;
        };
    }): any;
}
