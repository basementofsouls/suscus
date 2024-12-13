import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
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
}
