import { PrismaService } from 'prisma/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrderById(id: any): any;
    getOrders(user_id: any): any;
    updateOrderStatus(orderId: number, newStatus: string): Promise<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        artist_id: number;
        description: string | null;
        user_id: number;
        reference: string | null;
        status: string;
    }>;
    getArtistOrders(user_id: number): any;
    createOrder(data: any): import(".prisma/client").Prisma.Prisma__ordersClient<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        artist_id: number;
        description: string | null;
        user_id: number;
        reference: string | null;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteOrder(id: any): any;
}
