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
  Delete,
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
    @Body() body: { artist_id: string; description: string },
  ) {
    const { artist_id, description } = body;
    if (req.user.id == artist_id) {
      return { message: 'Вы не можете сделать заказ сами у себя' };
    }

    const link = await this.fileService.uploadFile(file);

    return this.ordersService.createOrder({
      user_id: parseInt(req.user.id),
      artist_id: parseInt(artist_id),
      description: description,
      image_url: link,
    });
  }
  
  @UseGuards(AuthGuard)
@Put('update')
async updateOrderStatus(
  @Request() req,
  @Body() body: { id: number; status: string },
) {
  const { id, status } = body;
  const order = await this.ordersService.getOrderById(id);

  // Проверяем, что заказ существует
  if (!order) {
    return { message: 'Заказ не найден' };
  }

  // Разрешаем изменение только автору заказа или художнику
  if (order.user_id !== req.user.id && order.artist_id !== req.user.id) {
    return { message: 'Нет доступа к изменению этого заказа' };
  }

  return this.ordersService.updateOrderStatus(id, status);
}


  @UseGuards(AuthGuard)
  @Delete('delete')
  async deletePublications(@Request() req, @Query() query: any) {
    const publication = await this.ordersService.getOrderById(query.id);
    //Проверка существует ли публикация и (роль = модератои или публикация принадлежит пользователю сделавшему запрос)\
    if (
      publication &&
      (req.user.role == 'moderator' || publication.user_id == req.user.id)
    ) {
      return this.ordersService.deleteOrder(query.id);
    } else {
      return { message: 'Не доступа' };
    }
  }
}
