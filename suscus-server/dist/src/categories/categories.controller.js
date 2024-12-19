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
exports.СategoriesController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const categories_service_1 = require("./categories.service");
let СategoriesController = class СategoriesController {
    constructor(сategoriesService) {
        this.сategoriesService = сategoriesService;
    }
    getAllCategories() {
        return this.сategoriesService.getAllCategories();
    }
    getPublicationCategories(query) {
        return this.сategoriesService.getPublicationCategories(query.id);
    }
    createCategorie(req, body) {
        console.log(body.data);
        if (req.user.role == 'moderator') {
            return this.сategoriesService.createCategorie(body.data);
        }
        else {
            return { message: 'Нет доступа' };
        }
    }
    updareCategorie(req, body) {
        if (req.user.role == 'moderator') {
            return this.сategoriesService.updateCategorie(body.data);
        }
        else {
            return { emssage: 'Нет доступа' };
        }
    }
    async deleteCategorie(req, query) {
        const commet = await this.сategoriesService.getCurrentCategories(query.id);
        if (commet[0] && req.user.role == 'moderator') {
            return this.сategoriesService.deleteCategorie(query.id);
        }
        else {
            return { message: 'Не доступа' };
        }
    }
};
exports.СategoriesController = СategoriesController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], СategoriesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('pub'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], СategoriesController.prototype, "getPublicationCategories", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], СategoriesController.prototype, "createCategorie", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], СategoriesController.prototype, "updareCategorie", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], СategoriesController.prototype, "deleteCategorie", null);
exports.СategoriesController = СategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.СategoriesService])
], СategoriesController);
//# sourceMappingURL=categories.controller.js.map