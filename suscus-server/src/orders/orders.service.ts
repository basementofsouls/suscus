import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  getOrderById(id: any): any {
    return this.prisma.orders.findFirst({ where: { id: parseInt(id) } });
  }

  getOrders(user_id: any): any {
    return this.prisma.orders.findMany({
      where: { user_id },
      include: {
        user: { select: { username: true } },   // Получаем имя клиента (пользователя)
        artist: { select: { username: true } }, // Получаем имя художника (пользователя)
      },
    });
  }

  async updateOrderStatus(orderId: number, newStatus: string) {
    return this.prisma.orders.update({
      where: { id: orderId },
      data: { status: newStatus, updated_at: new Date() },
    });
  }
  
  

  getArtistOrders(user_id: number): any {
    return this.prisma.orders.findMany({
      where: { artist_id: user_id },
      include: {
        user: { select: { username: true } },   // Имя клиента
        artist: { select: { username: true } }, // Имя художника
      },
    });
  }

  createOrder(data: any) {
    return this.prisma.orders.create({
      data: {
        artist_id: data.artist_id,
        user_id: data.user_id,
        reference: data.image_url,
        description: data.description,
        status: 'Новый',
      },
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
