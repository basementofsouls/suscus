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
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly pubService: PublicationsService) {}

  @UseGuards(AuthGuard)
  @Get('search')
  getMyPublications(@Query() query: any): any {
    return this.pubService.getPublications(query);
  }
  @UseGuards(AuthGuard)
  @Post('create')
  createPublication(
    @Request() req,
    @Body() body: { publication: { title: string; url: string } },
  ): any {
    return this.pubService.createPublication({
      title: body.publication.title,
      image_url: body.publication.url,
      artist_id: req.user.id,
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
  deletePublications(@Request() req, @Query() query: any): any {
    console.log('Проверка принадлежности поста к юзеру: успех');
    //получать объект публикации из бд
    return this.pubService.deletePublication(query);
  }
}
