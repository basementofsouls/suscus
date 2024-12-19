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
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  getComments(@Query() query: any): any {
    return this.commentsService.getComments(query);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  createComment(
    @Request() req,
    @Body()
    body: { data: { publicationId: string; text: string } },
  ): any {
    return this.commentsService.createComment({
      user: parseInt(req.user.id),
      publicationId: parseInt(body.data.publicationId),
      text: body.data.text,
    });
  }

  @UseGuards(AuthGuard)
  @Put('update')
  updareComment(
    @Request() req,
    @Body()
    body: {
      data: {
        id: number;
        content: string;
        user_id: number;
        publication_id: number;
      };
    },
  ): any {
    if (body.data.user_id == req.user.id) {
      console.log(true);
      //TODO проверка что комментарий принадлежит пользователю
    }
    return this.commentsService.updateComment(body.data);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async deleteComment(@Request() req, @Query() query: any) {
    const commet = await this.commentsService.getComment(query.id);
    if (
      commet[0] &&
      (req.user.role == 'moderator' || req.user.id == commet[0].user_id)
    ) {
      return this.commentsService.deleteComment(query);
    } else {
      return { message: 'Не доступа' };
    }
  }
}
