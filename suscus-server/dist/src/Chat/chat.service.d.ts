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
            read_at: Date | null;
        }[];
        artist: {
            id: number;
            username: string;
            email: string;
            password: string;
            avatar: string | null;
            role: string;
            created_at: Date | null;
            updated_at: Date | null;
        };
        client: {
            id: number;
            username: string;
            email: string;
            password: string;
            avatar: string | null;
            role: string;
            created_at: Date | null;
            updated_at: Date | null;
        };
    } & {
        id: number;
        created_at: Date | null;
        artist_id: number;
        client_id: number;
    }>;
    findById(id: number): Promise<{
        messages: {
            id: number;
            created_at: Date | null;
            chat_id: number;
            sender_id: number;
            text: string;
            read_at: Date | null;
        }[];
    } & {
        id: number;
        created_at: Date | null;
        artist_id: number;
        client_id: number;
    }>;
    markAllAsRead(chatId: number, userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getUserChats(userId: number): Promise<({
        messages: {
            id: number;
            created_at: Date | null;
            chat_id: number;
            sender_id: number;
            text: string;
            read_at: Date | null;
        }[];
        artist: {
            id: number;
            username: string;
            email: string;
            password: string;
            avatar: string | null;
            role: string;
            created_at: Date | null;
            updated_at: Date | null;
        };
        client: {
            id: number;
            username: string;
            email: string;
            password: string;
            avatar: string | null;
            role: string;
            created_at: Date | null;
            updated_at: Date | null;
        };
    } & {
        id: number;
        created_at: Date | null;
        artist_id: number;
        client_id: number;
    })[]>;
    saveMessage(chatId: number, senderId: number, text: string): Promise<{
        id: number;
        created_at: Date | null;
        chat_id: number;
        sender_id: number;
        text: string;
        read_at: Date | null;
    }>;
    getChatMessages(chatId: number): Promise<{
        id: number;
        created_at: Date | null;
        chat_id: number;
        sender_id: number;
        text: string;
        read_at: Date | null;
    }[]>;
}
