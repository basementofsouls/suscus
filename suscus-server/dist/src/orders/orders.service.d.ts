import { PrismaService } from 'prisma/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrders(user_id: any): any;
    createOrder(data: any): import(".prisma/client").Prisma.Prisma__ordersClient<{
        id: number;
        user_id: number;
        artist_id: number;
        reference: string | null;
        description: string | null;
        status: string;
        created_at: Date | null;
        updated_at: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateOrder(data: any): any;
}
