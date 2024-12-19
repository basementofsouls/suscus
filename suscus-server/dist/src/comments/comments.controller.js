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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const comments_service_1 = require("./comments.service");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    getComments(query) {
        return this.commentsService.getComments(query);
    }
    createComment(req, body) {
        return this.commentsService.createComment({
            user: parseInt(req.user.id),
            publicationId: parseInt(body.data.publicationId),
            text: body.data.text,
        });
    }
    updareComment(req, body) {
        if (body.data.user_id == req.user.id) {
            console.log(true);
        }
        return this.commentsService.updateComment(body.data);
    }
    async deleteComment(req, query) {
        const commet = await this.commentsService.getComment(query.id);
        if (commet[0] &&
            (req.user.role == 'moderator' || req.user.id == commet[0].user_id)) {
            return this.commentsService.deleteComment(query);
        }
        else {
            return { message: 'Не доступа' };
        }
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], CommentsController.prototype, "getComments", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], CommentsController.prototype, "createComment", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], CommentsController.prototype, "updareComment", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteComment", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map