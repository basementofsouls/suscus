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
exports.PublicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PublicationsService = class PublicationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getPublications(query) {
        let publications;
        try {
            if (query?.artist_id) {
                const artist_id = parseInt(query.artist_id);
                publications = this.prisma.publications.findMany({
                    where: { artist_id: artist_id },
                });
            }
            else if (query?.id) {
                const id = parseInt(query.id);
                publications = this.prisma.publications.findMany({
                    where: { id: id },
                });
            }
            else if (query?.title) {
                publications = this.prisma.publications.findMany({
                    where: { title: { contains: query.title } },
                });
            }
            else {
                publications = this.prisma.publications.findMany();
            }
            return publications;
        }
        catch (e) {
            console.log('getPublications Error', e.message);
            return null;
        }
    }
    async createPublication(data) {
        return this.prisma.publications.create({
            data: {
                artist_id: data.artist_id,
                title: data.title,
                image_url: data.image_url,
                description: data.description ? data.cdescriptionategory_id : null,
                category_id: data.category_id ? data.category_id : null,
            },
        });
    }
};
exports.PublicationsService = PublicationsService;
exports.PublicationsService = PublicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicationsService);
//# sourceMappingURL=publications.service.js.map