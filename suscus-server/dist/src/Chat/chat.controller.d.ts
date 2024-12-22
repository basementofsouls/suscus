import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getUserChats(req: any): any;
    getChatMessages(chatId: string): any;
    createChat(body: {
        clientId: number;
        artistId: number;
    }): any;
}
