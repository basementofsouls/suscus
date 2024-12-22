import { PrismaService } from 'prisma/prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    findOrCreateChat(clientId: number, artistId: number): Promise<{
        messages: {
            id: number;
            created_at: Date | null;
            chat_id: number;
            sender_id: number;
            text: string;
        }[];
    } & {
        id: number;
        client_id: number;
        artist_id: number;
        created_at: Date | null;
    }>;
    getUserChats(userId: number): Promise<any>;
    saveMessage(chatId: number, senderId: number, text: string): Promise<{
        id: number;
        created_at: Date | null;
        chat_id: number;
        sender_id: number;
        text: string;
    }>;
    getChatMessages(chatId: string): Promise<any>;
}
