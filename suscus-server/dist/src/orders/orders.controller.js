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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/auth.guard");
const orders_service_1 = require("./orders.service");
const file_service_1 = require("../file/file.service");
let OrdersController = class OrdersController {
    constructor(ordersService, fileService) {
        this.ordersService = ordersService;
        this.fileService = fileService;
    }
    getOrders(req, query) {
        return this.ordersService.getOrders(req.user.id);
    }
    getArtistOrders(req, query) {
        return this.ordersService.getArtistOrders(req.user.id);
    }
    async createOrder(req, file, body) {
        const { artistId, description } = body;
        if (req.user.id == artistId) {
            return { message: 'Вы не можете сделать заказ сами у себя' };
        }
        const link = await this.fileService.uploadFile(file);
        return this.ordersService.createOrder({
            user_id: parseInt(req.user.id),
            artist_id: parseInt(artistId),
            description: description,
            image_url: link,
        });
    }
    updareOrders(req, body) {
        return this.ordersService.updateOrder({
            title: body.publication.title,
            image_url: body.publication.url,
            artist_id: req.user.id,
        });
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('artist'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], OrdersController.prototype, "getArtistOrders", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: { fileSize: 500 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], OrdersController.prototype, "updareOrders", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        file_service_1.FileService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map