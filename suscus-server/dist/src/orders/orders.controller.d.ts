import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(req: any, query: any): any;
    createOrder(req: any, file: Express.Multer.File, body: {
        artistId: string;
        description: string;
    }): any;
    updareOrders(req: any, body: {
        publication: {
            title: string;
            url: string;
        };
    }): any;
}
