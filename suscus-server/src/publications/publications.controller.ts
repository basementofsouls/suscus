import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';

@Controller('publications')
export class PublicationsController {
  constructor(
    private readonly pubService: PublicationsService,
    private readonly fileService: FileService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('search')
  getMyPublications(@Query() query: any): any {
    return this.pubService.getPublications(query);
  }
  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 500 * 1024 * 1024 }, // Лимит 500 МБ
    }),
  )
  async createPublication(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      title: string;
      categories: string;
    },
  ) {
    const link = await this.fileService.uploadFile(file);

    return this.pubService.createPublication({
      title: body.title,
      image_url: link,
      artist_id: req.user.id,
      categories: JSON.parse(body.categories),
    });
  }

  @UseGuards(AuthGuard)
  @Put('update')
  updatePublication(
    @Request() req,
    @Body()
    body: {
      data: { id: string; title: string; url: string; artist_id: string };
    },
  ): any {
    if (body.data.artist_id == req.user.id) {
      console.log('Проверка принадлежности поста к юзеру: успех');
    }
    return this.pubService.updatePublication(body.data);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async deletePublications(@Request() req, @Query() query: any) {
    const publication = await this.pubService.getPublications({
      id: query.id,
    });
    //Проверка существует ли публикация и (роль = модератои или публикация принадлежит пользователю сделавшему запрос)\
    if (
      publication[0] &&
      (req.user.role == 'moderator' || publication[0].artist_id == req.user.id)
    ) {
      return this.pubService.deletePublication(query);
    } else {
      return { message: 'Не доступа' };
    }
  }
}
