import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class СategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    return await this.prisma.categories.findMany();
  }

  async getCurrentCategories(id: number) {
    return await this.prisma.categories.findFirst({ where: { id } });
  }

  async getPublicationCategories(query: any) {
    return await this.prisma.publication_categories.findMany({
      where: { publication_id: parseInt(query.id) },
    });
  }

  async createCategorie(data: any) {
    return await this.prisma.categories.create({
      data: { name: data.name },
    });
  }

  async updateCategorie(data: any) {
    return await this.prisma.categories.update({
      where: { id: data.id },
      data: { name: data.name },
    });
  }

  async deleteCategorie(query: any) {
    return await this.prisma.categories.delete({
      where: { id: parseInt(query.id) },
    });
  }
}
