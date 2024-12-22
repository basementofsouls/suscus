import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async getComment(id) {
    return await this.prisma.comments.findMany({
      where: { id: parseInt(id) },
    });
  }

  async getComments(query: any) {
    return await this.prisma.comments.findMany({
      where: { publication_id: parseInt(query.id) },
    });
  }

  async createComment(data: any) {
    return await this.prisma.comments.create({
      data: {
        user_id: data.user,
        publication_id: data.publicationId,
        content: data.content,
      },
    });
  }

  async updateComment(data: any) {
    return await this.prisma.comments.update({ where: { id: data.id }, data });
  }

  async deleteComment(query: any) {
    return await this.prisma.comments.delete({
      where: { id: parseInt(query.id) },
    });
  }
}
