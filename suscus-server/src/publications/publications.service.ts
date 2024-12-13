import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PublicationsService {
  constructor(private prisma: PrismaService) {}

  getPublications(query: any): any {
    let publications;
    try {
      if (query?.artist_id) {
        const artist_id = parseInt(query.artist_id);
        publications = this.prisma.publications.findMany({
          where: { artist_id: artist_id },
        });
      } else if (query?.id) {
        const id = parseInt(query.id);
        publications = this.prisma.publications.findMany({
          where: { id: id },
        });
      } else if (query?.title) {
        publications = this.prisma.publications.findMany({
          where: { title: { contains: query.title } },
        });
      } else {
        publications = this.prisma.publications.findMany();
      }

      return publications;
    } catch (e: any) {
      console.log('getPublications Error', e.message);
      return null;
    }
  }

  async createPublication(data: any) {
    return this.prisma.publications.create({
      data: {
        artist_id: data.artist_id,
        title: data.title,
        image_url: data.image_url,
        description: data.description ? data.cdescriptionategory_id : null,
        category_id: data.category_id ? data.category_id : null,
      },
    });
  }
}
