import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async getComment(id) {
    return await this.prisma.comments.findMany({
      where: { id: parseInt(id) },
      include: {
        users: { select: { username: true } } // Подключаем имя пользователя
      },
    });
  }

  async getComments(query: any) {
    return await this.prisma.comments.findMany({
      where: { publication_id: parseInt(query.id) },
      include: {
        users: { select: { username: true } } // Подключаем имя пользователя
      },
    });
  }
  

  async createComment(data: any) {
    const comment = await this.prisma.comments.create({
      data: {
        user_id: data.user,
        publication_id: data.publicationId,
        content: data.content,
      },
      include: {
        users: { select: { username: true } }  // Подключаем имя пользователя
      },
    });
    return comment;
  }

  async updateComment(data: { 
    id: number; 
    content?: string;  
    publication_id?: number; 
  }) {
    const updateData: any = {};
  
    if (data.content) {
      updateData.content = data.content;  // Если передано новое содержимое комментария
    }
  
    if (data.publication_id) {
      updateData.publication_id = data.publication_id;  // Обновляем публикацию
    }
  
    updateData.updated_at = new Date().toISOString();  // Обновляем временную метку
  
    return await this.prisma.comments.update({
      where: {
        id: data.id,  // ID комментария, который нужно обновить
      },
      data: updateData,  // Обновляем только данные комментария (не затрагиваем пользователя)
      include: {
        users: { select: { username: true } } // Подключаем имя пользователя для вывода
      },
    });
  }
  
  
  
  

  async deleteComment(query: any) {
    return await this.prisma.comments.delete({
      where: { id: parseInt(query.id) },
    });
  }
}
