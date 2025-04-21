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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CommentsService = class CommentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getComment(id) {
        return await this.prisma.comments.findMany({
            where: { id: parseInt(id) },
            include: {
                users: { select: { username: true } }
            },
        });
    }
    async getComments(query) {
        return await this.prisma.comments.findMany({
            where: { publication_id: parseInt(query.id) },
            include: {
                users: { select: { username: true } }
            },
        });
    }
    async createComment(data) {
        const comment = await this.prisma.comments.create({
            data: {
                user_id: data.user,
                publication_id: data.publicationId,
                content: data.content,
            },
            include: {
                users: { select: { username: true } }
            },
        });
        return comment;
    }
    async updateComment(data) {
        const updateData = {};
        if (data.content) {
            updateData.content = data.content;
        }
        if (data.publication_id) {
            updateData.publication_id = data.publication_id;
        }
        updateData.updated_at = new Date().toISOString();
        return await this.prisma.comments.update({
            where: {
                id: data.id,
            },
            data: updateData,
            include: {
                users: { select: { username: true } }
            },
        });
    }
    async deleteComment(query) {
        return await this.prisma.comments.delete({
            where: { id: parseInt(query.id) },
        });
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map