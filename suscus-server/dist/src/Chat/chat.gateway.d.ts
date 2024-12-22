import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway {
    private chatService;
    server: Server;
    constructor(chatService: ChatService);
    handleJoinChat({ chatId }: {
        chatId: number;
    }, client: Socket): Promise<void>;
    handleMessage({ chatId, senderId, text, }: {
        chatId: number;
        senderId: number;
        text: string;
    }): Promise<void>;
}
