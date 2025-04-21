import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @MessageBody() { chatId }: { chatId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const chat = await this.chatService.findById(chatId);
    if (chat.messages.length > 0) {
      client.join(`chat_${chatId}`);
      this.server.to(`chat_${chatId}`).emit('chatJoined', { chatId });
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    {
      chatId,
      senderId,
      text,
    }: {
      chatId: number;
      senderId: number;
      text: string;
    },
  ) {
    const message = await this.chatService.saveMessage(chatId, senderId, text);
    this.server.to(`chat_${chatId}`).emit('newMessage', message);
  }
}
