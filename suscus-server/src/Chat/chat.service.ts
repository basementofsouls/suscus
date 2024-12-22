import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateChat(clientId: number, artistId: number) {
    try {
      let chat = await this.prisma.chats.findFirst({
        where: { client_id: clientId, artist_id: artistId },
        include: { messages: true },
      });

      if (!chat) {
        chat = await this.prisma.chats.create({
          data: {
            client_id: clientId,
            artist_id: artistId,
          },
          include: { messages: true },
        });
      }

      return chat;
    } catch (e) {
      return e;
    }
  }

  async getUserChats(userId: number) {
    try {
      return await this.prisma.chats.findMany({
        where: {
          OR: [{ client_id: userId }, { artist_id: userId }],
        },
        include: { messages: true },
      });
    } catch (e) {
      return e;
    }
  }

  async saveMessage(chatId: number, senderId: number, text: string) {
    return this.prisma.messages.create({
      data: {
        chat_id: chatId,
        sender_id: senderId,
        text,
      },
    });
  }

  async getChatMessages(chatId: string) {
    try {
      return this.prisma.messages.findMany({
        where: { chat_id: parseInt(chatId) },
        orderBy: { created_at: 'asc' },
      });
    } catch (e) {
      return e;
    }
  }
}
