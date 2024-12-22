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
                include: { messages: true },
            });
            if (!chat) {
                chat = await this.prisma.chats.create({
                    data: {
                        client_id: clientId,
                        artist_id: artistId,
                    },
                    include: { messages: true },
                });
            }
            return chat;
        }
        catch (e) {
            return e;
        }
    }
    async getUserChats(userId) {
        try {
            return await this.prisma.chats.findMany({
                where: {
                    OR: [{ client_id: userId }, { artist_id: userId }],
                },
                include: { messages: true },
            });
        }
        catch (e) {
            return e;
        }
    }
    async saveMessage(chatId, senderId, text) {
        return this.prisma.messages.create({
            data: {
                chat_id: chatId,
                sender_id: senderId,
                text,
            },
        });
    }
    async getChatMessages(chatId) {
        try {
            return this.prisma.messages.findMany({
                where: { chat_id: parseInt(chatId) },
                orderBy: { created_at: 'asc' },
            });
        }
        catch (e) {
            return e;
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map