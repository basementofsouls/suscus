import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrdersService } from './orders.service';
import { FileService } from 'src/file/file.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly fileService: FileService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('my')
  getOrders(@Request() req, @Query() query: any): any {
    return this.ordersService.getOrders(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('artist')
  getArtistOrders(@Request() req, @Query() query: any): any {
    return this.ordersService.getArtistOrders(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 500 * 1024 * 1024 }, // Лимит 500 МБ
    }),
  )
  async createOrder(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { artistId: string; description: string },
  ) {
    const { artistId, description } = body;
    if (req.user.id == artistId) {
      return { message: 'Вы не можете сделать заказ сами у себя' };
    }

    const link = await this.fileService.uploadFile(file);

    return this.ordersService.createOrder({
      user_id: parseInt(req.user.id),
      artist_id: parseInt(artistId),
      description: description,
      image_url: link,
    });
  }

  @UseGuards(AuthGuard)
  @Put('update')
  updareOrders(
    @Request() req,
    @Body() body: { publication: { title: string; url: string } },
  ): any {
    return this.ordersService.updateOrder({
      title: body.publication.title,
      image_url: body.publication.url,
      artist_id: req.user.id,
    });
  }
}
