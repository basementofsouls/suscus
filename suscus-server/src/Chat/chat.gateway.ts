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
    @MessageBody()
    { clientId, artistId }: { clientId: number; artistId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const chat = await this.chatService.findOrCreateChat(clientId, artistId);
    client.join(`chat_${chat.id}`);
    this.server.to(`chat_${chat.id}`).emit('chatJoined', chat);
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
