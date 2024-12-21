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
exports.СategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let СategoriesService = class СategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllCategories() {
        return await this.prisma.categories.findMany();
    }
    async getCurrentCategories(id) {
        return await this.prisma.categories.findFirst({ where: { id } });
    }
    async getPublicationCategories(query) {
        return await this.prisma.publication_categories.findMany({
            where: { publication_id: parseInt(query.id) },
        });
    }
    async createCategorie(data) {
        return await this.prisma.categories.create({
            data: { name: data.name },
        });
    }
    async updateCategorie(data) {
        return await this.prisma.categories.update({
            where: { id: data.id },
            data: { name: data.name },
        });
    }
    async deleteCategorie(id) {
        return await this.prisma.categories.delete({
            where: { id: parseInt(id) },
        });
    }
};
exports.СategoriesService = СategoriesService;
exports.СategoriesService = СategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], СategoriesService);
//# sourceMappingURL=categories.service.js.map