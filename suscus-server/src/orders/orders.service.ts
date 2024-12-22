import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  getOrderById(id: any): any {
    return this.prisma.orders.findFirst({ where: { id: parseInt(id) } });
  }

  getOrders(user_id: any): any {
    return this.prisma.orders.findMany({ where: { user_id } });
  }

  getArtistOrders(user_id: any): any {
    return this.prisma.orders.findMany({ where: { artist_id: user_id } });
  }

  createOrder(data: any) {
    return this.prisma.orders.create({
      data: {
        artist_id: data.artist_id,
        user_id: data.user_id,
        reference: data.image_url,
        description: data.description,
        status: 'created',
      },
    });
  }

  updateOrder(data: any) {
    return this.prisma.orders.update({
      where: { id: data.id },
      data: { status: data.status },
    });
  }

  deleteOrder(id) {
    try {
      const resp = this.prisma.orders.delete({
        where: { id: parseInt(id) },
      });
      return resp;
    } catch (e: any) {
      return e;
    }
  }
}
