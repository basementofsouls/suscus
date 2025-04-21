import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getUserChats(req: any): any;
    markAllMessagesAsRead(body: {
        chatId: number;
    }, req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getChatMessages(chatId: string): any;
    createChat(body: {
        clientId: number;
        artistId: number;
    }): any;
}
