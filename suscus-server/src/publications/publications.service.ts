import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PublicationsService {
  constructor(private prisma: PrismaService) {}

  async getPublications(query: any) {
    let publications;
    try {
      const filters: any = {};

      // Фильтр по artist_id
      if (query?.artist_id) {
        const artistId = parseInt(query.artist_id);
        if (!isNaN(artistId)) {
          filters.artist_id = artistId;
        } else {
          throw new Error('Invalid artist_id');
        }
      }

      // Фильтр по id
      if (query?.id) {
        const id = parseInt(query.id);
        if (!isNaN(id)) {
          filters.id = id;
        } else {
          throw new Error('Invalid id');
        }
      }

      // Фильтр по title
      if (query?.title) {
        filters.title = { contains: query.title, mode: 'insensitive' };
      }

      // Фильтр по категориям
      if (query?.categories) {
        // Преобразуем строку категорий в массив чисел
        const categoryIds = Array.isArray(query.categories)
          ? query.categories
              .map((id: any) => parseInt(id))
              .filter((id: number) => !isNaN(id))
          : query.categories
              .split(',')
              .map((id: any) => parseInt(id))
              .filter((id: number) => !isNaN(id));

        if (categoryIds.length > 0) {
          filters.publication_categories = {
            some: {
              category_id: { in: categoryIds },
            },
          };
        }
      }

      // Выполняем запрос с учетом фильтров
      publications = await this.prisma.publications.findMany({
        where: filters,
        include: {
          publication_categories: true, // Включаем категории в результат (если нужно)
          users: {
            select: {
              username: true, // Добавляем username артиста
            },
          },
        },
      });

      return publications;
    } catch (e: any) {
      console.error('getPublications Error:', e.message);
      return null;
    }
  }


  async createPublication(data: any) {
    const publication = await this.prisma.publications.create({
      data: {
        title: data.title,
        image_url: data.image_url,
        description: data.description ? data.description : null,
        users: {
          connect: {id : data.artist_id}
        }
      },
    });
    if (data.categories.length > 0) {
      for (const id of data.categories) {
        await this.prisma.publication_categories.create({
          data: {
            publication_id: publication.id,
            category_id: id,
          },
        });
      }
    }
    return publication;
  }

  async updatePublication(data:any) {
    return await this.prisma.publications.update({
      where: { id: data.id },
      data: { description: data.description },
    });
  }

  async deletePublication(query: any) {
    try {
      const resp = this.prisma.publications.delete({
        where: { id: parseInt(query.id) },
      });
      return resp;
    } catch (e: any) {
      return e;
    }
  }
}
