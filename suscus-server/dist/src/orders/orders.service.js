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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getOrderById(id) {
        return this.prisma.orders.findFirst({ where: { id: parseInt(id) } });
    }
    getOrders(user_id) {
        return this.prisma.orders.findMany({
            where: { user_id },
            include: {
                user: { select: { username: true } },
                artist: { select: { username: true } },
            },
        });
    }
    async updateOrderStatus(orderId, newStatus) {
        return this.prisma.orders.update({
            where: { id: orderId },
            data: { status: newStatus, updated_at: new Date() },
        });
    }
    getArtistOrders(user_id) {
        return this.prisma.orders.findMany({
            where: { artist_id: user_id },
            include: {
                user: { select: { username: true } },
                artist: { select: { username: true } },
            },
        });
    }
    createOrder(data) {
        return this.prisma.orders.create({
            data: {
                artist_id: data.artist_id,
                user_id: data.user_id,
                reference: data.image_url,
                description: data.description,
                status: 'Новый',
            },
        });
    }
    deleteOrder(id) {
        try {
            const resp = this.prisma.orders.delete({
                where: { id: parseInt(id) },
            });
            return resp;
        }
        catch (e) {
            return e;
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map