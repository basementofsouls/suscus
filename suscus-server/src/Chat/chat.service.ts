import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // Метод для поиска чата по клиенту и художнику
  async findOrCreateChat(clientId: number, artistId: number) {
    try {
      // Проверяем, есть ли чат с такими пользователями
      let chat = await this.prisma.chats.findFirst({
        where: { client_id: clientId, artist_id: artistId },
        include: {
          messages: true,
          client: true, // Добавляем клиента
          artist: true, // Добавляем художника
        },
      });

      // Если чата нет, создаем новый
      if (!chat) {
        chat = await this.prisma.chats.create({
          data: {
            client_id: clientId,
            artist_id: artistId,
          },
          include: {
            messages: true,
            client: true, // Добавляем клиента
            artist: true, // Добавляем художника
          },
        });
      }

      return chat;
    } catch (e) {
      throw new Error('Ошибка при создании или поиске чата: ' + e.message);
    }
  }

  // Получаем чат по его ID
  async findById(id: number) {
    try {
      return await this.prisma.chats.findUnique({
        where: { id }, // Используем findUnique для получения одного чата
        include: { messages: true },
      });
    } catch (e) {
      throw new Error('Ошибка при получении чата: ' + e.message);
    }
  }
  
  async markAllAsRead(chatId: number, userId: number) {
    try {
      return await this.prisma.messages.updateMany({
        where: {
          chat_id: chatId,
          sender_id: { not: userId }, // только входящие
          read_at: null,
        },
        data: {
          read_at: new Date(),
        },
      });
    } catch (e) {
      throw new Error('Ошибка при массовой пометке как прочитанных: ' + e.message);
    }
  }
  
  // Получаем все чаты пользователя
  async getUserChats(userId: number) {
    console.log("Получаем чаты для пользователя с ID:", userId);
    try {
      const chats = await this.prisma.chats.findMany({
        where: {
          OR: [{ client_id: userId }, { artist_id: userId }],
        },
        include: {
          messages: true,
          client: true, // Добавляем клиента
          artist: true, // Добавляем художника
        },
      });
  
      console.log("Найденные чаты:", JSON.stringify(chats, null, 2)); // Выводим чаты
      return chats;
    } catch (e) {
      throw new Error("Ошибка при получении чатов пользователя: " + e.message);
    }
  }
  
  

  // Сохраняем сообщение в чат
  async saveMessage(chatId: number, senderId: number, text: string) {
    try {
      return await this.prisma.messages.create({
        data: {
          chat_id: chatId,
          sender_id: senderId,
          text,
        },
      });
    } catch (e) {
      throw new Error('Ошибка при сохранении сообщения: ' + e.message);
    }
  }

  // Получаем историю сообщений чата
  async getChatMessages(chatId: number) {
    try {
      return await this.prisma.messages.findMany({
        where: { chat_id: chatId }, // Здесь сразу используем тип number
        orderBy: { created_at: 'asc' },
      });
    } catch (e) {
      throw new Error('Ошибка при получении сообщений чата: ' + e.message);
    }
  }
}
