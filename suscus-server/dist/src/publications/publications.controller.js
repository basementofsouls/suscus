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
exports.PublicationsController = void 0;
const common_1 = require("@nestjs/common");
const publications_service_1 = require("./publications.service");
const auth_guard_1 = require("../auth/auth.guard");
let PublicationsController = class PublicationsController {
    constructor(pubService) {
        this.pubService = pubService;
    }
    getMyPublications(query) {
        return this.pubService.getPublications(query);
    }
    createPublication(req, body) {
        return this.pubService.createPublication({
            title: body.publication.title,
            image_url: body.publication.url,
            artist_id: req.user.id,
        });
    }
    updatePublication(req, body) {
        if (body.data.artist_id == req.user.id) {
            console.log('Проверка принадлежности поста к юзеру: успех');
        }
        return this.pubService.updatePublication(body.data);
    }
    deletePublications(req, query) {
        console.log('Проверка принадлежности поста к юзеру: успех');
        return this.pubService.deletePublication(query);
    }
};
exports.PublicationsController = PublicationsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], PublicationsController.prototype, "getMyPublications", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], PublicationsController.prototype, "createPublication", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], PublicationsController.prototype, "updatePublication", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], PublicationsController.prototype, "deletePublications", null);
exports.PublicationsController = PublicationsController = __decorate([
    (0, common_1.Controller)('publications'),
    __metadata("design:paramtypes", [publications_service_1.PublicationsService])
], PublicationsController);
//# sourceMappingURL=publications.controller.js.map