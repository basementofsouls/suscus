import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { СategoriesService } from './categories.service';

@Controller('categories')
export class СategoriesController {
  constructor(private readonly сategoriesService: СategoriesService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  getAllCategories(): any {
    return this.сategoriesService.getAllCategories();
  }

  @UseGuards(AuthGuard)
  @Get('pub')
  getPublicationCategories(@Query() query: any): any {
    return this.сategoriesService.getPublicationCategories(query.id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  createCategorie(
    @Request() req,
    @Body() body: { data: { name: string } },
  ): any {
    console.log(body.data);
    if (req.user.role == 'moderator') {
      return this.сategoriesService.createCategorie(body.data);
    } else {
      return { message: 'Нет доступа' };
    }
  }

  @UseGuards(AuthGuard)
  @Put('update')
  updareCategorie(
    @Request() req,
    @Body() body: { id: string; name: string },
  ): any {
    if (req.user.role == 'moderator') {
      return this.сategoriesService.updateCategorie(body);
    } else {
      return { emssage: 'Нет доступа' };
    }
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async deleteCategorie(@Request() req, @Query() query: any) {
    const comment = await this.сategoriesService.getCurrentCategories(
      parseInt(query.id),
    );

    if (comment && req.user.role == 'moderator') {
      return this.сategoriesService.deleteCategorie(query.id);
    } else {
      return { message: 'Не доступа' };
    }
  }
}
