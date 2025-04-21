import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Get('my')
  getUserChats(@Request() req): any {
    return this.chatService.getUserChats(req.user.id);
  }

  @UseGuards(AuthGuard)
@Post('messages/read')
markAllMessagesAsRead(
  @Body() body: { chatId: number },
  @Request() req
) {
  return this.chatService.markAllAsRead(body.chatId, req.user.id);
}


  @UseGuards(AuthGuard)
  @Get('messages')
  getChatMessages(@Query('chatId') chatId: string): any {
    return this.chatService.getChatMessages(Number(chatId));
    ;
  }

  @UseGuards(AuthGuard)
  @Post('create')
  createChat(@Body() body: { clientId: number; artistId: number }): any {
    return this.chatService.findOrCreateChat(body.clientId, body.artistId);
  }
}
