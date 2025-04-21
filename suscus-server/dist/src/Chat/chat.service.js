"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ChatService = class ChatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOrCreateChat(clientId, artistId) {
        try {
            let chat = await this.prisma.chats.findFirst({
                where: { client_id: clientId, artist_id: artistId },
                include: {
                    messages: true,
                    client: true,
                    artist: true,
                },
            });
            if (!chat) {
                chat = await this.prisma.chats.create({
                    data: {
                        client_id: clientId,
                        artist_id: artistId,
                    },
                    include: {
                        messages: true,
                        client: true,
                        artist: true,
                    },
                });
            }
            return chat;
        }
        catch (e) {
            throw new Error('Ошибка при создании или поиске чата: ' + e.message);
        }
    }
    async findById(id) {
        try {
            return await this.prisma.chats.findUnique({
                where: { id },
                include: { messages: true },
            });
        }
        catch (e) {
            throw new Error('Ошибка при получении чата: ' + e.message);
        }
    }
    async markAllAsRead(chatId, userId) {
        try {
            return await this.prisma.messages.updateMany({
                where: {
                    chat_id: chatId,
                    sender_id: { not: userId },
                    read_at: null,
                },
                data: {
                    read_at: new Date(),
                },
            });
        }
        catch (e) {
            throw new Error('Ошибка при массовой пометке как прочитанных: ' + e.message);
        }
    }
    async getUserChats(userId) {
        console.log("Получаем чаты для пользователя с ID:", userId);
        try {
            const chats = await this.prisma.chats.findMany({
                where: {
                    OR: [{ client_id: userId }, { artist_id: userId }],
                },
                include: {
                    messages: true,
                    client: true,
                    artist: true,
                },
            });
            console.log("Найденные чаты:", JSON.stringify(chats, null, 2));
            return chats;
        }
        catch (e) {
            throw new Error("Ошибка при получении чатов пользователя: " + e.message);
        }
    }
    async saveMessage(chatId, senderId, text) {
        try {
            return await this.prisma.messages.create({
                data: {
                    chat_id: chatId,
                    sender_id: senderId,
                    text,
                },
            });
        }
        catch (e) {
            throw new Error('Ошибка при сохранении сообщения: ' + e.message);
        }
    }
    async getChatMessages(chatId) {
        try {
            return await this.prisma.messages.findMany({
                where: { chat_id: chatId },
                orderBy: { created_at: 'asc' },
            });
        }
        catch (e) {
            throw new Error('Ошибка при получении сообщений чата: ' + e.message);
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map